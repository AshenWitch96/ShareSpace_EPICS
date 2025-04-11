'use client';

import React, { useState } from 'react';

const API_KEY = 'AIzaSyCT61ZYXGTPUsU6k5YOmytvfsuyWd8bVVk'; // Gemini API key
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'; // Gemini API URL

const Chatbot = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateResponse = async (prompt: string) => {
    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
    } catch (error) {
      console.error('Error generating response:', error);
      return 'Sorry, I encountered an error. Please try again.';
    }
  };

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userInput, isUser: true },
    ]);
    setUserInput('');
    setIsLoading(true);

    const botMessage = await generateResponse(userInput);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: botMessage, isUser: false },
    ]);
    setIsLoading(false);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={message.isUser ? 'user-message' : 'bot-message'}
            >
              <div className="message-content">{message.text}</div>
            </div>
          ))}
          {isLoading && (
            <div className="bot-message">
              <div className="message-content">...</div>
            </div>
          )}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleUserInput()}
            placeholder="Type your message..."
            className="input-field"
          />
          <button
            onClick={handleUserInput}
            className="send-button"
            disabled={isLoading || !userInput.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
