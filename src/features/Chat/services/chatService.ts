import api from "./api";
import {
  ChatRequest,
  ChatResponse,
} from "../../../types/chats";

export const sendMessage = async (
  payload: ChatRequest
): Promise<ChatResponse> => {
  const response = await api.post(
    "/chat",
    payload
  );

  return response.data;
};

export const resetSession = async (
  sessionId: string
): Promise<void> => {
  await api.post(
    `/sessions/${sessionId}/reset`
  );
};