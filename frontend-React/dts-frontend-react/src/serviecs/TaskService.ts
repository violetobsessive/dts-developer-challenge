// Axios API Wrapper to communicate with Spring Boot backend

import axios from "axios";

export interface Task {
  id?: number;
  title: string;
  description?: string;
  status: string;
  dueDate: string;
}
const API_BASE = "http://localhost:8080/api/tasks";

// APIs to send requests for backend
export const createTask = (task: Task) => axios.post<Task>(API_BASE, task);
export const getTasks = () => axios.get<Task[]>(API_BASE);
export const getTask = (id: number) => axios.get<Task>(`${API_BASE}/${id}`);
export const updateTaskStatus = (id: number, status: string) =>
  axios.put(`${API_BASE}/${id}/status`, { status });
export const deleteTask = (id: number) => axios.delete(`${API_BASE}/${id}`);
