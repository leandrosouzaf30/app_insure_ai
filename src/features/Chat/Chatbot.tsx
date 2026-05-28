import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useChatSession } from "../../hooks/useChatSession";

export const Chatbot: React.FC = () => {
  const {
    messages,
    inputValue,
    setInputValue,
    send,
    isTyping,
    messagesEndRef,
    sessionId,
    currentStage,
  } = useChatSession();

  return (
    <div className="chat-card">
      <header className="chat-header">
        <div>
          <div className="chat-status">
            Online
          </div>

          {sessionId && (
            <small>
              Sessão: {sessionId}
              <br />
              Etapa: {currentStage}
            </small>
          )}
        </div>
      </header>

      <div className="chat-body">
        <div className="message-list">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-row ${
                msg.sender === "user"
                  ? "message-user"
                  : "message-bot"
              }`}
            >
              <div className="message-bubble">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.text}
                </ReactMarkdown>

                <span className="message-meta">
                  {msg.timestamp.toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="chat-footer"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) =>
            setInputValue(e.target.value)
          }
          placeholder="Digite sua mensagem..."
          className="chat-input"
        />

        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="btn-primary btn-send"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};