import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { PRODUCTS, STORE_POLICIES } from './src/data/products.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Prepare compact catalog knowledge for AI context
const catalogSummary = PRODUCTS.map(p => ({
  id: p.id,
  name: p.name,
  category: p.category,
  subCategory: p.subCategory,
  price: p.price,
  originalPrice: p.originalPrice,
  sizes: p.sizes,
  colors: p.colors.map(c => c.name),
  tags: p.tags,
  inStock: p.inStock,
  rating: p.rating,
  pairWith: p.pairWithIds
}));

const SYSTEM_INSTRUCTION = `
You are "HerCloset AI Stylist", the luxury digital fashion concierge for HerCloset ("Your Style, Your Story.").
Your job is to assist women in discovering flattering outfits, matching accessories, answering questions about fits, sizes, fabric care, prices, availability, delivery, and returns.

Brand Philosophy & Tone:
- Elegant, warm, empowering, articulate, and fashion-forward.
- Color aesthetic: Blush pink, warm ivory, pure white, and dark espresso brown.
- Always recommend real products from the HerCloset catalog provided below.

HerCloset Catalog Data:
${JSON.stringify(catalogSummary, null, 2)}

Store Policies:
- Free shipping on orders over $${STORE_POLICIES.freeShippingThreshold} (standard delivery 2-4 business days).
- ${STORE_POLICIES.returnsPolicy}.
- Support: ${STORE_POLICIES.email}, ${STORE_POLICIES.phone}.

Output Format Guideline:
- Reply warmly in friendly, conversational paragraphs or neat styling bullet points.
- When recommending products, explicitly mention their exact names and prices.
- At the very end of your response, if you recommended any products from the catalog, include a JSON block in this exact format:
[RECOMMENDED_PRODUCTS: ["hc-01", "hc-05"]]
List between 1 to 4 product IDs that best match the user's query. If no products are specifically recommended (e.g. asking a pure shipping question), you can omit the block or provide [RECOMMENDED_PRODUCTS: []].
`;

// AI Stylist Endpoint
app.post('/api/ai-stylist', async (req: Request, res: Response): Promise<void> => {
  try {
    const { messages, userQuery, preferences } = req.body;
    const query = userQuery || (messages && messages[messages.length - 1]?.content) || '';

    if (!query) {
      res.status(400).json({ error: 'Query is required.' });
      return;
    }

    // Try Gemini API if client is available
    if (aiClient) {
      try {
        const conversationHistory = (messages || []).slice(-6).map((m: { role: string; content: string }) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }));

        let promptText = query;
        if (preferences && Object.keys(preferences).length > 0) {
          promptText += `\n[User preferences: ${JSON.stringify(preferences)}]`;
        }

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            ...conversationHistory,
            { role: 'user', parts: [{ text: promptText }] }
          ],
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          }
        });

        const rawText = response.text || '';
        
        // Extract recommended product IDs
        let recommendedIds: string[] = [];
        const match = rawText.match(/\[RECOMMENDED_PRODUCTS:\s*(\[[^\]]*\])\]/);
        let cleanedReply = rawText;
        if (match && match[1]) {
          try {
            recommendedIds = JSON.parse(match[1]);
            cleanedReply = rawText.replace(/\[RECOMMENDED_PRODUCTS:\s*(\[[^\]]*\])\]/, '').trim();
          } catch (e) {
            console.error('Error parsing recommended product IDs:', e);
          }
        }

        // Get full product objects for recommended IDs
        const recommendedProducts = PRODUCTS.filter(p => recommendedIds.includes(p.id));

        res.json({
          reply: cleanedReply,
          recommendedProducts,
          source: 'gemini'
        });
        return;
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to smart catalog assistant:', geminiError);
      }
    }

    // Intelligent Catalog Fallback
    const lowerQuery = query.toLowerCase();
    let matchedProducts = PRODUCTS.filter(p => {
      const matchName = p.name.toLowerCase().includes(lowerQuery);
      const matchCat = p.category.toLowerCase().includes(lowerQuery);
      const matchTag = p.tags.some(t => lowerQuery.includes(t.toLowerCase()) || t.toLowerCase().includes(lowerQuery));
      const matchDesc = p.description.toLowerCase().includes(lowerQuery);
      return matchName || matchCat || matchTag || matchDesc;
    });

    if (matchedProducts.length === 0) {
      if (lowerQuery.includes('dress') || lowerQuery.includes('gown')) {
        matchedProducts = PRODUCTS.filter(p => p.category === 'Dresses');
      } else if (lowerQuery.includes('ethnic') || lowerQuery.includes('traditional') || lowerQuery.includes('saree') || lowerQuery.includes('anarkali') || lowerQuery.includes('sharara')) {
        matchedProducts = PRODUCTS.filter(p => p.category === 'Ethnic Wear');
      } else if (lowerQuery.includes('suit') || lowerQuery.includes('blazer') || lowerQuery.includes('pant') || lowerQuery.includes('work') || lowerQuery.includes('formal')) {
        matchedProducts = PRODUCTS.filter(p => p.category === 'Western Wear');
      } else if (lowerQuery.includes('jewelry') || lowerQuery.includes('bag') || lowerQuery.includes('accessory') || lowerQuery.includes('earring')) {
        matchedProducts = PRODUCTS.filter(p => p.category === 'Accessories');
      } else {
        matchedProducts = PRODUCTS.slice(0, 3);
      }
    }

    let customReply = `I'd love to help you style this! Based on what you're looking for, here are my top HerCloset recommendations tailored to your style:`;
    
    if (lowerQuery.includes('shipping') || lowerQuery.includes('delivery')) {
      customReply = `At HerCloset, we offer complimentary express shipping on all orders over $${STORE_POLICIES.freeShippingThreshold}. Standard delivery takes 2 to 4 business days with premium tracked couriers. Each package arrives in our signature blush pink keepsake box!`;
    } else if (lowerQuery.includes('return') || lowerQuery.includes('exchange')) {
      customReply = `We offer a 30-day hassle-free return and exchange policy! If your item doesn't fit like a dream, simply request a prepaid return label from your account or contact care@hercloset.com. All returned items must be unwashed with tags intact.`;
    } else if (lowerQuery.includes('wedding') || lowerQuery.includes('cocktail') || lowerQuery.includes('party')) {
      customReply = `For celebratory occasions, you will look breathtaking! The Aura Mulberry Silk Slip Dress ($139) offers fluid elegance, or consider our Zahra Chanderi Anarkali Set ($189) with delicate gold zari embroidery. Pair either with our Elysian Rose Quartz Pendant or Kundan Jhumkas to complete the look.`;
    } else if (lowerQuery.includes('work') || lowerQuery.includes('office') || lowerQuery.includes('formal')) {
      customReply = `For polished elegance at work, I recommend our Sienna Double-Breasted Linen Blazer ($125) paired with the Palazzo High-Waisted Trousers ($89). Add our Seraphina Silk Camisole underneath for effortless transition to evening cocktails!`;
    }

    res.json({
      reply: customReply,
      recommendedProducts: matchedProducts.slice(0, 3),
      source: 'smart-catalog-assistant'
    });

  } catch (error) {
    console.error('AI Stylist error:', error);
    res.status(500).json({
      reply: "I am having a brief moment of reflection. Please feel free to ask me again or browse our curated collections!",
      recommendedProducts: PRODUCTS.slice(0, 3),
      error: 'Internal assistant error'
    });
  }
});

// Setup Vite or static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HerCloset full-stack server running at http://localhost:${PORT}`);
  });
}

startServer();
