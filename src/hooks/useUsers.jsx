import { useState, useEffect } from 'react'
import { usersAPI } from '../services/api'

export const useUsers = () => {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    // Загрузка всех пользователей
    const fetchUsers = async () => {
        setIsLoading(true)
        setError(null)
        
        try {
            const response = await usersAPI.getAll()
            
            if (response.success) {
                setUsers(response.data)
                return { success: true, data: response.data }
            } else {
                setError(response.message)
                return { success: false, error: response.message }
            }
        } catch (err) {
            const errorMessage = err.message || 'Қате орын алды'
            setError(errorMessage)
            return { success: false, error: errorMessage }
        } finally {
            setIsLoading(false)
        }
    }

    // Создание нового пользователя
    const createUser = async (userData) => {
        setIsLoading(true)
        setError(null)
        
        try {
            const response = await usersAPI.create(userData)
            
            if (response.success) {
                setUsers(prev => [...prev, response.data])
                return { success: true, data: response.data }
            } else {
                setError(response.message)
                return { success: false, error: response.message }
            }
        } catch (err) {
            const errorMessage = err.message || 'Пайдаланушыны жасау қатесі'
            setError(errorMessage)
            return { success: false, error: errorMessage }
        } finally {
            setIsLoading(false)
        }
    }

    // Обновление пользователя
    const updateUser = async (id, userData) => {
        setIsLoading(true)
        setError(null)
        
        try {
            const response = await usersAPI.update(id, userData)
            
            if (response.success) {
                setUsers(prev => prev.map(u => u.id === id ? response.data : u))
                return { success: true, data: response.data }
            } else {
                setError(response.message)
                return { success: false, error: response.message }
            }
        } catch (err) {
            const errorMessage = err.message || 'Жаңарту қатесі'
            setError(errorMessage)
            return { success: false, error: errorMessage }
        } finally {
            setIsLoading(false)
        }
    }

    // Удаление пользователя
    const deleteUser = async (id) => {
        setIsLoading(true)
        setError(null)
        
        try {
            const response = await usersAPI.delete(id)
            
            if (response.success) {
                setUsers(prev => prev.filter(u => u.id !== id))
                return { success: true }
            } else {
                setError(response.message)
                return { success: false, error: response.message }
            }
        } catch (err) {
            const errorMessage = err.message || 'Өшіру қатесі'
            setError(errorMessage)
            return { success: false, error: errorMessage }
        } finally {
            setIsLoading(false)
        }
    }

    // Получение одного пользователя
    const getUserById = (id) => {
        return users.find(u => u.id === id)
    }

    // Загрузка пользователей при монтировании
    useEffect(() => {
        fetchUsers()
    }, [])

    return {
        users,
        isLoading,
        error,
        fetchUsers,
        createUser,
        updateUser,
        deleteUser,
        getUserById
    }
}
