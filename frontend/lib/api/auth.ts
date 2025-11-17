import { apiClient } from '../api-client'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  username: string
  password: string
}

export interface User {
  _id: string
  email: string
  username: string
  fullName?: string
  avatar?: {
    url: string
    localPath: string
  }
  role?: string
  isEmailVerified: boolean
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export const authApi = {
  login: async (data: LoginRequest) => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data)
    return response.data
  },

  register: async (data: RegisterRequest) => {
    const response = await apiClient.post<{ user: User }>('/auth/register', data)
    return response.data
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout')
    return response.data
  },

  getCurrentUser: async () => {
    const response = await apiClient.post<User>('/auth/current-user')
    return response.data
  },

  forgotPassword: async (email: string) => {
    const response = await apiClient.post('/auth/forgot-password', { email })
    return response.data
  },

  resetPassword: async (resetToken: string, newPassword: string) => {
    const response = await apiClient.post(`/auth/reset-password/${resetToken}`, {
      newPassword,
    })
    return response.data
  },

  refreshToken: async () => {
    const response = await apiClient.post<{ accessToken: string; refreshToken: string }>(
      '/auth/refresh-token'
    )
    return response.data
  },
}

