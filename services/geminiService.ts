import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the client
// API Key must be provided in the environment environment
const apiKey = process.env.API_KEY || ''; 
// Fallback for demo purposes if env is missing, though instructions say assume it exists. 
// We will strictly follow instructions and use process.env.API_KEY.

let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({ apiKey });
}

export const generateFinancialAdvice = async (
  prompt: string, 
  currentContext: string
): Promise<string> => {
  if (!aiClient) {
    return "AI Assistant unavailable: API Key not configured.";
  }

  try {
    const modelId = "gemini-2.5-flash"; // Efficient for chat interactions
    const systemInstruction = `You are a knowledgeable and professional retirement planning assistant for NetYield (similar to Fidelity Planviewer).
    The user is looking at their 401(k) dashboard.
    
    Current User Context: ${currentContext}
    
    Guidelines:
    1. Be concise, professional, and encouraging.
    2. Explain financial concepts simply (vesting, asset allocation, compound interest).
    3. If the user has $0 balance, encourage them to start contributing early to benefit from compounding.
    4. Do not give specific legal or tax advice; provide general educational information.
    `;

    const response: GenerateContentResponse = await aiClient.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error while analyzing your request. Please try again later.";
  }
};