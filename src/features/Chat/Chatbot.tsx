import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from "./services/chatService";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou seu assistente virtual integrado ao Cognito local. Como posso te ajudar hoje?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Faz o scroll automático para a mensagem mais recente
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const data = await sendMessage({
        question: userMessage.text,
        top_k: 3,
        model: "string",
      });

      const botMessage: Message = {
        id: crypto.randomUUID(),
        text: data.answer,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: "Não consegui obter uma resposta do servidor.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-card">
      <header className="chat-header">
        <div>
          <div className="chat-status">Online</div>
        </div>
      </header>

      <div className="chat-body">
        <div className="message-list">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-row ${msg.sender === 'user' ? 'message-user' : 'message-bot'}`}>
              <div className="message-bubble">
                <p>{msg.text}</p>
                <span className="message-meta">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message-row message-bot">
              <div className="typing-indicator">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSendMessage} className="chat-footer">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite sua mensagem aqui..."
          className="chat-input"
        />
        <button type="submit" disabled={!inputValue.trim()} className="btn-primary btn-send">
          Enviar
        </button>
      </form>
    </div>
  );
};