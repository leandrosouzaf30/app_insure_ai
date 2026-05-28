import { useEffect, useRef, useState } from "react";

import {
  sendMessage,
  resetSession,
} from "../features/Chat/services/chatService";

import {
  clearSession,
  getSession,
  saveSession,
} from "../storage/chatStorage";

import {
  ChatResponse,
  Message,
} from "../types/chats";

export const useChatSession = () => {
  const [messages, setMessages] = useState<
    Message[]
  >([
    {
      id: crypto.randomUUID(),
      text: "Olá! Como posso ajudar você hoje?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] =
    useState("");

  const [isTyping, setIsTyping] =
    useState(false);

  const [sessionId, setSessionId] =
    useState<string | null>(null);

  const [currentStage, setCurrentStage] =
    useState<string | null>(null);

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = getSession();

    if (stored) {
      setSessionId(stored.sessionId);
      setCurrentStage(stored.currentStage);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const addMessage = (
    text: string,
    sender: "user" | "bot"
  ) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text,
        sender,
        timestamp: new Date(),
      },
    ]);
  };

  const send = async () => {
    if (!inputValue.trim()) return;

    const question = inputValue;

    addMessage(question, "user");

    setInputValue("");
    setIsTyping(true);

    try {
      const payload = sessionId
        ? {
            question,
            session_id: sessionId,
            current_stage:
              currentStage || undefined,
            top_k: 3,
          }
        : {
            question,
            top_k: 3,
          };

      const data: ChatResponse =
        await sendMessage(payload);

      addMessage(data.answer, "bot");

      setSessionId(data.session_id);

      setCurrentStage(data.next_stage);

      saveSession({
        sessionId: data.session_id,
        currentStage: data.next_stage,
      });

      if (data.flow_complete) {
        addMessage(
          "Sessão encerrada com sucesso.",
          "bot"
        );

        await resetSession(data.session_id);

        setSessionId(null);
        setCurrentStage(null);

        clearSession();
      }
    } catch (error) {
      addMessage(
        "Erro ao comunicar com servidor.",
        "bot"
      );
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    inputValue,
    setInputValue,
    send,
    isTyping,
    messagesEndRef,
    sessionId,
    currentStage,
  };
};