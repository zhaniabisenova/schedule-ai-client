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

// Default API object для использования в других модулях
const api = {
  get: async (url, options = {}) => {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'GET',
      headers: {
        ...(options.responseType === 'blob' ? {} : { 'Content-Type': 'application/json' }),
        ...getAuthHeaders(),
        ...options.headers
      },
      ...options
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Қате орын алды')
    }
    
    // Если это blob (файл), возвращаем объект с данными
    if (options.responseType === 'blob') {
      return {
        data: await response.blob(),
        status: response.status
      }
    }
    
    const data = await response.json()
    return data
  },
  
  post: async (url, data, options = {}) => {
    const isFormData = data instanceof FormData
    
    return await fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...getAuthHeaders(),
        ...options.headers
      },
      body: isFormData ? data : JSON.stringify(data),
      ...options
    }).then(async (response) => {
      const responseData = await response.json()
      if (!response.ok) {
        throw new Error(responseData.message || 'Қате орын алды')
      }
      return responseData
    })
  },
  
  put: async (url, data) => {
    return await request(url, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  },
  
  delete: async (url) => {
    return await request(url, { method: 'DELETE' })
  }
}

export default api
