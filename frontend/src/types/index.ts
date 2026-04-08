export interface User {
  id: number;
  email: string;
}

export interface Project {
  id: number;
  title: string;
  description: string | null;
  status: "active" | "completed";
  created_at: string;
  owner_id: number;
}

export interface PaginatedProjects {
  total: number;
  page: number;
  page_size: number;
  results: Project[];
}

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: "todo" | "in-progress" | "done";
  due_date: string | null;
  created_at: string;
  project_id: number;
}

export type TaskStatus = Task["status"];

export interface AuthResponse {
  access_token: string;
  token_type: string;
}