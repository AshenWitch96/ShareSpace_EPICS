'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatContextType {
  chatHistory: Message[];
  setChatHistory: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { sender: 'bot', text: 'Hello there! How can I help you today?' },
  ]);

  return (
    <ChatContext.Provider value={{ chatHistory, setChatHistory }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChatContext must be used within a ChatContextProvider');
  return context;
};
