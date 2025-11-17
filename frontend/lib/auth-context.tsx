'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { authApi, type User as ApiUser } from './api/auth'

export interface User {
  id: string
  email: string
  name: string
  username: string
  role: 'admin' | 'project_admin' | 'member'
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, username: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper to map API user to frontend user
const mapApiUserToUser = (apiUser: ApiUser): User => {
  return {
    id: apiUser._id,
    email: apiUser.email,
    name: apiUser.fullName || apiUser.username,
    username: apiUser.username,
    role: 'member', // Default role, actual role comes from project membership
    avatar: apiUser.avatar?.url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${apiUser.email}`,
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('auth_user')
      const token = localStorage.getItem('auth_token')
      const refresh = localStorage.getItem('auth_refresh_token')
      
      if (storedUser && (token || refresh)) {
        try {
          // Verify token is still valid by fetching current user
          const currentUser = await authApi.getCurrentUser()
          const mappedUser = mapApiUserToUser(currentUser)
          setUser(mappedUser)
          localStorage.setItem('auth_user', JSON.stringify(mappedUser))
        } catch (error) {
          // Token invalid, clear storage
          localStorage.removeItem('auth_user')
          localStorage.removeItem('auth_token')
          setUser(null)
        }
      }
      setIsLoading(false)
    }
    
    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await authApi.login({ email, password })
      
      // Store tokens
      localStorage.setItem('auth_token', response.accessToken)
      localStorage.setItem('auth_refresh_token', response.refreshToken)
      
      // Map and store user
      const mappedUser = mapApiUserToUser(response.user)
      setUser(mappedUser)
      localStorage.setItem('auth_user', JSON.stringify(mappedUser))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed'
      throw new Error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, username: string) => {
    setIsLoading(true)
    try {
      await authApi.register({ email, username, password })
      
      // Auto-login after successful registration
      const loginResponse = await authApi.login({ email, password })
      localStorage.setItem('auth_token', loginResponse.accessToken)
      localStorage.setItem('auth_refresh_token', loginResponse.refreshToken)
      const loggedInUser = mapApiUserToUser(loginResponse.user)
      setUser(loggedInUser)
      localStorage.setItem('auth_user', JSON.stringify(loggedInUser))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed'
      throw new Error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API call failed:', error)
    } finally {
      setUser(null)
      localStorage.removeItem('auth_user')
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_refresh_token')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
