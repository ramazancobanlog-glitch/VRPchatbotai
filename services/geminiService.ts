
import { GoogleGenAI, Type } from "@google/genai";
import { Message, GeminiModel, UserProfile } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  private buildSystemInstruction(profile?: UserProfile): string {
    let base = "You are a helpful, intelligent AI assistant for the application zipChatBotAi. Provide concise and accurate information.";
    if (profile) {
      if (profile.name) {
        base += ` You are chatting with ${profile.name}. Always be friendly and address them by name occasionally.`;
      }
      if (profile.preferences) {
        base += ` Keep in mind the user's preferences: ${profile.preferences}. Tailor your responses to match these preferences.`;
      }
    }
    return base;
  }

  async *streamChat(
    modelName: string,
    history: Message[],
    userInput: string,
    profile?: UserProfile,
    attachments?: { data: string; mimeType: string }[]
  ) {
    const contents = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: msg.parts || [{ text: msg.content }]
    }));

    const currentParts: any[] = [{ text: userInput }];
    if (attachments) {
      attachments.forEach(att => {
        currentParts.push({
          inlineData: {
            data: att.data,
            mimeType: att.mimeType
          }
        });
      });
    }

    contents.push({
      role: 'user',
      parts: currentParts
    });

    try {
      const streamResponse = await this.ai.models.generateContentStream({
        model: modelName,
        contents: contents as any,
        config: {
          systemInstruction: this.buildSystemInstruction(profile),
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
        },
      });

      for await (const chunk of streamResponse) {
        const text = chunk.text;
        if (text) yield text;
      }
    } catch (error: any) {
      console.error("Gemini Streaming Error:", error);
      throw error;
    }
  }

  async updateMemory(messages: Message[], currentProfile: UserProfile): Promise<UserProfile> {
    try {
      const recentContext = messages.slice(-4).map(m => `${m.role}: ${m.content}`).join("\n");
      
      const response = await this.ai.models.generateContent({
        model: GeminiModel.FLASH,
        contents: `Based on this conversation snippet, extract the user's name and any stated preferences. 
        If not mentioned, keep the existing values: Name: ${currentProfile.name || 'Unknown'}, Preferences: ${currentProfile.preferences || 'None'}.
        
        Recent interaction:
        ${recentContext}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "The user's first name or nickname if mentioned." },
              preferences: { type: Type.STRING, description: "A concise summary of user preferences, interests, or style mentioned." }
            },
            required: ["name", "preferences"]
          }
        }
      });

      const data = JSON.parse(response.text || "{}");
      return {
        name: data.name !== "Unknown" ? data.name : currentProfile.name,
        preferences: data.preferences !== "None" ? data.preferences : currentProfile.preferences
      };
    } catch (error) {
      console.error("Memory Extraction Error:", error);
      return currentProfile;
    }
  }

  async generateTitle(firstMessage: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: GeminiModel.FLASH,
        contents: `Generate a very short (max 4 words) title for a chat that starts with: "${firstMessage}". Return only the title text, no quotes.`,
      });
      return response.text?.trim() || "New Chat";
    } catch (error) {
      return "New Chat";
    }
  }
}

export const geminiService = new GeminiService();
