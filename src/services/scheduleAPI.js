/**
 * API сервис для работы с расписанием
 */

import { API_URL } from '../config/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const scheduleAPI = {
  // Получить все расписания
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_URL}/schedules${queryString ? '?' + queryString : ''}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Ошибка при получении расписаний');
    }
    
    return response.json();
  },

  // Получить расписание по ID
  getById: async (id) => {
    const response = await fetch(`${API_URL}/schedules/${id}`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Ошибка при получении расписания');
    }
    
    return response.json();
  },

  // Получить расписание для группы
  getForGroup: async (scheduleId, groupId) => {
    const response = await fetch(`${API_URL}/schedules/${scheduleId}/group/${groupId}`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Ошибка при получении расписания группы');
    }
    
    return response.json();
  },

  // Получить расписание для преподавателя
  getForTeacher: async (scheduleId, teacherId) => {
    const response = await fetch(`${API_URL}/schedules/${scheduleId}/teacher/${teacherId}`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Ошибка при получении расписания преподавателя');
    }
    
    return response.json();
  },

  // Сгенерировать новое расписание
  generate: async (semesterId) => {
    const response = await fetch(`${API_URL}/schedules/generate`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ semesterId })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Ошибка при генерации расписания');
    }
    
    return response.json();
  },

  // Оптимизировать расписание
  optimize: async (scheduleId, maxIterations = 100) => {
    const response = await fetch(`${API_URL}/schedules/${scheduleId}/optimize`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ maxIterations })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Ошибка при оптимизации расписания');
    }
    
    return response.json();
  },

  // Оценить качество расписания
  evaluate: async (scheduleId) => {
    const response = await fetch(`${API_URL}/schedules/${scheduleId}/evaluate`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Ошибка при оценке расписания');
    }
    
    return response.json();
  },

  // Проверить конфликты
  checkConflicts: async (scheduleId) => {
    const response = await fetch(`${API_URL}/schedules/${scheduleId}/conflicts`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Ошибка при проверке конфликтов');
    }
    
    return response.json();
  },

  // Валидировать расписание
  validate: async (scheduleId) => {
    const response = await fetch(`${API_URL}/schedules/${scheduleId}/validate`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Ошибка при валидации расписания');
    }
    
    return response.json();
  },

  // Получить статистику
  getStats: async (scheduleId) => {
    const response = await fetch(`${API_URL}/schedules/${scheduleId}/stats`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Ошибка при получении статистики');
    }
    
    return response.json();
  },

  // Опубликовать расписание
  publish: async (scheduleId) => {
    const response = await fetch(`${API_URL}/schedules/${scheduleId}/publish`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Ошибка при публикации расписания');
    }
    
    return response.json();
  },

  // Клонировать расписание
  clone: async (scheduleId, newSemesterId, newName) => {
    const response = await fetch(`${API_URL}/schedules/${scheduleId}/clone`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ newSemesterId, newName })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Ошибка при клонировании расписания');
    }
    
    return response.json();
  },

  // CRUD для занятий
  lessons: {
    // Создать занятие
    create: async (lessonData) => {
      const response = await fetch(`${API_URL}/schedules/lessons`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(lessonData)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Ошибка при создании занятия');
      }
      
      return response.json();
    },

    // Обновить занятие
    update: async (lessonId, lessonData) => {
      const response = await fetch(`${API_URL}/schedules/lessons/${lessonId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(lessonData)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Ошибка при обновлении занятия');
      }
      
      return response.json();
    },

    // Удалить занятие
    delete: async (lessonId) => {
      const response = await fetch(`${API_URL}/schedules/lessons/${lessonId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Ошибка при удалении занятия');
      }
      
      return response.json();
    }
  }
};

export default scheduleAPI;

