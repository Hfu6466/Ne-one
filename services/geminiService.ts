import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.STRING,
    description: "A 10-digit phone number found in the file."
  },
};

export async function extractPhoneNumbersFromImage(base64Image: string, mimeType: string): Promise<string[]> {
  const prompt = `
    You are an expert Optical Character Recognition (OCR) system. Analyze the provided image or document.
    Your task is to identify and extract ONLY the 10-digit numerical sequences that are likely to be phone numbers.
    Ignore all other text, symbols, and numbers that are not 10 digits long.
    Do not add any explanation or introductory text.
    Return the results strictly in the format of a JSON array of strings.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        thinkingConfig: { thinkingBudget: 0 },
      }
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
      return [];
    }
    
    const parsedResult = JSON.parse(jsonText);

    if (Array.isArray(parsedResult) && parsedResult.every(item => typeof item === 'string')) {
      return parsedResult;
    } else {
      throw new Error("API returned data in an unexpected format.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to extract numbers from the file. Please try again.");
  }
}