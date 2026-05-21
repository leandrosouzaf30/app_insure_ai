import api from "./api";

export interface ChatRequest {
  question: string;
  top_k?: number;
  model?: string;
}

export interface ChatResponse {
  answer: string;
}

export const sendMessage = async (
  payload: ChatRequest
): Promise<ChatResponse> => {
  const response = await api.post("/chat", payload);

  return response.data;
};