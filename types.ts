
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
  FLASH = 'gemini-3-flash-preview',
  PRO = 'gemini-3-pro-preview'
}
