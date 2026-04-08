import api from "./axios";
import type { Task } from "../types";

export const getTasksByProject = async (
  projectId: number,
  status?: string
): Promise<Task[]> => {
  const response = await api.get(`/tasks/project/${projectId}`, {
    params: status ? { status } : {},
  });
  return response.data;
};

export const getTasks = getTasksByProject;

export const createTask = async (data: {
  title: string;
  description?: string;
  status?: string;
  due_date?: string;
  project_id: number;
}): Promise<Task> => {
  const response = await api.post("/tasks/", data);
  return response.data;
};

export const updateTask = async (id: number, data: {
  title?: string;
  description?: string;
  status?: string;
  due_date?: string;
}): Promise<Task> => {
  const response = await api.put(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};