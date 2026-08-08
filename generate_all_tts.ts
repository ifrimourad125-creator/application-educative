import { GoogleGenAI, Modality } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { modelUnits } from './src/data/modelUnits.ts';
import { extraModelUnits } from './src/data/extraModelUnits.ts';

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("No API key");
    return;
  }
  const ai = new GoogleGenAI({ apiKey });

  const units = [...Object.values(modelUnits), ...Object.values(extraModelUnits)];
  
  for (const unit of units) {
    const listening = (unit as any).listening;
    if (listening && listening.audio && listening.script) {
      let audioPathStr = '';
      if (typeof listening.audio === 'string') {
        audioPathStr = listening.audio;
      } else if (listening.audio && listening.audio.text) {
        audioPathStr = listening.audio.text;
      }
      
      let scriptStr = '';
      if (typeof listening.script === 'string') {
        scriptStr = listening.script;
      } else if (listening.script && listening.script.text) {
        scriptStr = listening.script.text;
      }

      if (!audioPathStr || !scriptStr) continue;

      let audioPath = audioPathStr;
      if (audioPath.startsWith('/')) {
         audioPath = audioPath.substring(1);
      }
      
      const outPath = path.join(__dirname, 'public', audioPath);
      
      console.log(`Generating TTS for ${audioPath}...`);
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-tts-preview",
          contents: [{ parts: [{ text: scriptStr }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Charon' }, 
              },
            },
          },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          const buffer = Buffer.from(base64Audio, 'base64');
          const sampleRate = 24000;
          const numChannels = 1;
          const bitsPerSample = 16;
          const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
          const blockAlign = numChannels * (bitsPerSample / 8);
          const dataSize = buffer.length;
          const chunkSize = 36 + dataSize;
          
          const header = Buffer.alloc(44);
          header.write('RIFF', 0);
          header.writeUInt32LE(chunkSize, 4);
          header.write('WAVE', 8);
          header.write('fmt ', 12);
          header.writeUInt32LE(16, 16);
          header.writeUInt16LE(1, 20);
          header.writeUInt16LE(numChannels, 22);
          header.writeUInt32LE(sampleRate, 24);
          header.writeUInt32LE(byteRate, 28);
          header.writeUInt16LE(blockAlign, 32);
          header.writeUInt16LE(bitsPerSample, 34);
          header.write('data', 36);
          header.writeUInt32LE(dataSize, 40);
          
          const wavBuffer = Buffer.concat([header, buffer]);
          fs.writeFileSync(outPath, wavBuffer);
          console.log(`Wrote ${outPath}`);
        } else {
          console.log(`No audio returned for ${audioPath}`);
        }
      } catch (err: any) {
         console.error(`Error generating TTS for ${audioPath}:`, err.message);
      }
      
      // Wait to avoid rate limit
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  console.log("ALL DONE!");
}

run();
