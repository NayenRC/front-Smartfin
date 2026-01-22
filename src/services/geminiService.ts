import { GoogleGenAI } from "@google/genai";
import { ImageSize } from "../../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateAIChatResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful, witty, and financially savvy assistant named 'NeonBot'. Keep answers concise, encouraging, and use emojis. You help users with financial literacy.",
      }
    });
    return response.text || "Lo siento, no pude procesar eso.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Tuve un problema conectando con mi cerebro digital. Intenta de nuevo.";
  }
};

export const generateFinanceImage = async (prompt: string, size: ImageSize): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: size 
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
        }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    return null;
  }
};