
export type Role = 'user' | 'assistant' | 'system';

export interface MessagePart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  parts?: MessagePart[];
  isError?: boolean;
}

export interface UserProfile {
  name: string | null;
  preferences: string | null;
}

export interface ChatThread {
  id: string;
  title: string;
  messages: Message[];
  model: string;
  createdAt: number;
}

export enum GeminiModel {
  GEMINI_3_FLASH = 'gemini-3-flash-preview',
  GEMINI_3_PRO = 'gemini-3-pro-preview',
  GEMINI_2_5_FLASH = 'gemini-2.5-flash',
  GEMINI_2_5_PRO = 'gemini-2.5-pro',
  GEMINI_2_0_FLASH = 'gemini-2.0-flash',
  GEMMA_3_27B = 'gemma-3-27b-it',
  GEMMA_3_12B = 'gemma-3-12b-it',
  GEMMA_3_4B = 'gemma-3-4b-it'
}
