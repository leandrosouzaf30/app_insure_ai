const SESSION_KEY = "chat_session";

export interface StoredSession {
  sessionId: string;
  currentStage: string;
}

export const saveSession = (
  data: StoredSession
) => {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(data)
  );
};

export const getSession =
  (): StoredSession | null => {
    const data =
      localStorage.getItem(SESSION_KEY);

    if (!data) return null;

    return JSON.parse(data);
  };

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};