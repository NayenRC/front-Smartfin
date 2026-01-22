export enum AppView {
  LANDING = 'LANDING',
  CHAT = 'CHAT',
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD'
}

export interface CollectedData {
  type: 'EXPENSE' | 'GOAL' | null;
  amount: number | null;
  category: string | null;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  type?: 'text' | 'options' | 'card';
  options?: string[];
  cardData?: {
    label: string;
    value: string;
  };
}

export interface UserProfile {
  id: string;
  email: string;
}

export type ImageSize = '1K' | '2K' | '4K';