import api from "./axios";
import type { Project, PaginatedProjects } from "../types";

export const getProjects = async (
  page: number = 1,
  page_size: number = 10,
  search: string = ""
): Promise<PaginatedProjects> => {
  const response = await api.get("/projects/", {
    params: { page, page_size, search },
  });
  return response.data;
};

export const getProject = async (id: number): Promise<Project> => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (data: { title: string; description?: string; status?: string }): Promise<Project> => {
  const response = await api.post("/projects/", data);
  return response.data;
};

export const updateProject = async (id: number, data: { title?: string; description?: string; status?: string }): Promise<Project> => {
  const response = await api.put(`/projects/${id}`, data);
  return response.data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await api.delete(`/projects/${id}`);
};