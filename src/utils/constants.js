// Константы приложения
export const APP_CONFIG = {
    name: 'Schedule AI',
    version: '1.0.0',
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    storageKey: 'schedule-ai-storage'
}

// Константы для расписания
export const SCHEDULE_CONSTANTS = {
    DAYS: [
        { key: 'monday', label: 'Понедельник', short: 'Пн' },
        { key: 'tuesday', label: 'Вторник', short: 'Вт' },
        { key: 'wednesday', label: 'Среда', short: 'Ср' },
        { key: 'thursday', label: 'Четверг', short: 'Чт' },
        { key: 'friday', label: 'Пятница', short: 'Пт' },
        { key: 'saturday', label: 'Суббота', short: 'Сб' }
    ],
    
    TIME_SLOTS: [
        '08:00', '09:30', '11:00', '12:30', '14:00', '15:30', '17:00'
    ],
    
    LESSON_TYPES: {
        lecture: { label: 'Лекция', color: 'primary' },
        practical: { label: 'Практика', color: 'success' },
        lab: { label: 'Лабораторная', color: 'warning' },
        exam: { label: 'Экзамен', color: 'danger' },
        consultation: { label: 'Консультация', color: 'info' }
    },
    
    USER_ROLES: {
        student: 'student',
        teacher: 'teacher',
        admin: 'admin'
    }
}

// Константы для API
export const API_ENDPOINTS = {
    auth: {
        login: '/auth/login',
        logout: '/auth/logout',
        register: '/auth/register',
        profile: '/auth/profile'
    },
    schedule: {
        list: '/schedule',
        create: '/schedule',
        update: '/schedule/:id',
        delete: '/schedule/:id'
    },
    users: {
        list: '/users',
        profile: '/users/:id',
        update: '/users/:id'
    }
}

// Константы для уведомлений
export const NOTIFICATION_TYPES = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info'
}

// Константы для валидации
export const VALIDATION_RULES = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: {
        minLength: 6,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true
    },
    name: {
        minLength: 2,
        maxLength: 50
    }
}
