export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface ChatRequest {
  question: string;
  top_k?: number;
  session_id?: string;
  current_stage?: string;
}

export interface ChatResponse {
  session_id: string;
  flow_category: string;
  current_stage: string;
  next_stage: string;
  flow_complete: boolean;
  requires_escalation: boolean;
  question: string;
  answer: string;
  model_used: string;

  sources?: string[];
  intent?: string;
  faq_match?: boolean;
  retries?: number;
  error?: string | null;
}