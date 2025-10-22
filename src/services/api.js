import { API_URL, API_ENDPOINTS, getAuthHeaders } from '../config/api'

// Базовая функция для запросов
const request = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
        ...options.headers
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Қате орын алды')
    }

    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Auth API
export const authAPI = {
  login: async (credentials) => {
    const data = await request(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
    
    // Сохраняем токен
    if (data.success && data.data.token) {
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('user', JSON.stringify(data.data.user))
    }
    
    return data
  },

  logout: async () => {
    try {
      await request(API_ENDPOINTS.LOGOUT, { method: 'POST' })
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },

  getCurrentUser: async () => {
    return await request(API_ENDPOINTS.ME)
  }
}

// Users API
export const usersAPI = {
  getAll: async () => {
    return await request(API_ENDPOINTS.USERS)
  },

  getById: async (id) => {
    return await request(API_ENDPOINTS.USER_BY_ID(id))
  },

  create: async (userData) => {
    return await request(API_ENDPOINTS.USERS, {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  },

  update: async (id, userData) => {
    return await request(API_ENDPOINTS.USER_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(userData)
    })
  },

  delete: async (id) => {
    return await request(API_ENDPOINTS.USER_BY_ID(id), {
      method: 'DELETE'
    })
  }
}

