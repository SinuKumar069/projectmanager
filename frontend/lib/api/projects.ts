import { apiClient } from '../api-client'

export interface Project {
  _id: string
  name: string
  description: string
  createdBy: string
  createdAt: string
  updatedAt: string
  members?: number
}

export interface ProjectMember {
  user: {
    _id: string
    username: string
    fullName?: string
    avatar?: {
      url: string
    }
  }
  role: string
  project: string
}

export interface CreateProjectRequest {
  name: string
  description: string
}

export interface UpdateProjectRequest {
  name: string
  description: string
}

export interface AddMemberRequest {
  email: string
  role: string
}

export const projectsApi = {
  getProjects: async () => {
    const response = await apiClient.get<Project[]>('/projects')
    return response.data
  },

  getProjectById: async (projectId: string) => {
    const response = await apiClient.get<Project>(`/projects/${projectId}`)
    return response.data
  },

  createProject: async (data: CreateProjectRequest) => {
    const response = await apiClient.post<Project>('/projects', data)
    return response.data
  },

  updateProject: async (projectId: string, data: UpdateProjectRequest) => {
    const response = await apiClient.put<Project>(`/projects/${projectId}`, data)
    return response.data
  },

  deleteProject: async (projectId: string) => {
    const response = await apiClient.delete(`/projects/${projectId}`)
    return response.data
  },

  getProjectMembers: async (projectId: string) => {
    const response = await apiClient.get<ProjectMember[]>(`/projects/${projectId}/members`)
    return response.data
  },

  addMember: async (projectId: string, data: AddMemberRequest) => {
    const response = await apiClient.post(`/projects/${projectId}/members`, data)
    return response.data
  },

  updateMemberRole: async (projectId: string, userId: string, newRole: string) => {
    const response = await apiClient.put(
      `/projects/${projectId}/members/${userId}`,
      { newRole }
    )
    return response.data
  },

  deleteMember: async (projectId: string, userId: string) => {
    const response = await apiClient.delete(`/projects/${projectId}/members/${userId}`)
    return response.data
  },
}

