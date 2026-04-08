import api from "./axios";
import type { AuthResponse, User } from "../types";

export const registerUser = async (email: string, password: string): Promise<User> => {
  const response = await api.post("/auth/register", { email, password });
  return response.data;
};

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};