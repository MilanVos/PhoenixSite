const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Language {
  id: number;
  name: string;
  category: string;
  level: string;
  iconUrl: string | null;
  color: string | null;
  order: number;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

async function fetchAPI<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || "Request failed");
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

function authHeaders(token: string | null): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  getProjects: () => fetchAPI<Project[]>("/projects"),
  getLanguages: () => fetchAPI<Language[]>("/languages"),

  submitContact: (data: { name: string; email: string; message: string }) =>
    fetchAPI<{ success: boolean; id: number }>("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (username: string, password: string) =>
    fetchAPI<{ token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  getMessages: (token: string) =>
    fetchAPI<ContactMessage[]>("/contact", {
      headers: authHeaders(token),
    }),

  markMessageRead: (id: number, token: string) =>
    fetchAPI<ContactMessage>(`/contact/${id}/read`, {
      method: "PATCH",
      headers: authHeaders(token),
    }),

  deleteMessage: (id: number, token: string) =>
    fetchAPI<void>(`/contact/${id}`, {
      method: "DELETE",
      headers: authHeaders(token),
    }),

  createProject: (data: Partial<Project>, token: string) =>
    fetchAPI<Project>("/projects", {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    }),

  updateProject: (id: number, data: Partial<Project>, token: string) =>
    fetchAPI<Project>(`/projects/${id}`, {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    }),

  deleteProject: (id: number, token: string) =>
    fetchAPI<void>(`/projects/${id}`, {
      method: "DELETE",
      headers: authHeaders(token),
    }),

  createLanguage: (data: Partial<Language>, token: string) =>
    fetchAPI<Language>("/languages", {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    }),

  updateLanguage: (id: number, data: Partial<Language>, token: string) =>
    fetchAPI<Language>(`/languages/${id}`, {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    }),

  deleteLanguage: (id: number, token: string) =>
    fetchAPI<void>(`/languages/${id}`, {
      method: "DELETE",
      headers: authHeaders(token),
    }),
};
