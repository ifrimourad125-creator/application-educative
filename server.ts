import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Tutor API Route using Gemini 2.5 Flash
  app.post('/api/tutor', async (req, res) => {
    try {
      const { prompt, context } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Le champ prompt est requis.' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          reply:
            "Bonjour ! Je suis ton assistant de Français Collège. Je réponds à tes questions sur la grammaire, la conjugaison et la rédaction. Comment puis-je t'aider aujourd'hui ?",
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `Tu es un professeur virtuel de français expert et bienveillant spécialisé dans le programme officiel de Français du Collège Marocain (niveaux 1AC, 2AC et 3AC).
Ta mission est d'aider les élèves à comprendre leurs leçons, corriger leurs textes, expliquer la grammaire, le vocabulaire et les préparer aux épreuves orales et écrites.
Sois clair, encourageant et utilise des exemples pertinents. Réponds en français soigné et structuré.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `${systemInstruction}\n\nContexte: ${context || 'Programme Général Collège'}\nQuestion de l'élève: ${prompt}`,
              },
            ],
          },
        ],
      });

      const reply = response.text || "Désolé, je n'ai pas pu générer de réponse.";
      return res.json({ reply });
    } catch (err: any) {
      console.error('Tutor API Error:', err);
      return res.json({
        reply:
          "Je rencontre une difficulté temporaire de connexion, mais garde en tête qu'en français au collège, la relecture des accords sujet-verbe et des homophones est primordiale !",
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'Français Collège Mobile' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Android Mobile App server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
