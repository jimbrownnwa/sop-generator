export interface Process {
  id: string;
  name: string;
  description: string;
  owner: string;
  category: string;
  status: "in_progress" | "completed";
  created_at: number;
  updated_at: number;
}

export interface ProcessStep {
  id: string;
  process_id: string;
  sequence_order: number;
  step_name: string;
  description: string;
  role_responsible: string;
  systems_used: string[];
  inputs: string[];
  outputs: string[];
  decision_points: string;
  time_estimate: string;
  frequency: string;
  pain_points: string;
  notes: string;
  dependencies: string[];
}

export interface InterviewSession {
  id: string;
  process_id: string;
  current_step: number;
  conversation_history: ConversationMessage[];
  completed: boolean;
}

export interface ConversationMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export type ProcessCategory =
  | "Sales"
  | "Operations"
  | "Finance"
  | "Customer Service"
  | "HR"
  | "Marketing"
  | "Product Development"
  | "Other";
