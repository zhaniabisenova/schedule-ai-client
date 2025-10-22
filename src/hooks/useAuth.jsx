/**
 * useAuth hook - пайдаланушының кіруі мен шығуы үшін
 * 
 * Бұл hook барлық қолданбада пайдаланушы деректерін басқарады:
 * - Кіру (login)
 * - Шығу (logout) 
 * - Профильді жаңарту
 * - Токенді тексеру
 * 
 * Қысқасы: бұл файл пайдаланушының "кілті" - барлық кіру/шығу осы жерден өтеді
 */

import { useState, useEffect, useContext, createContext } from 'react'
import { authAPI } from '../services/api'

// Auth контекстін жасаймыз - барлық қолданбада пайдаланушы деректерін бөлісу үшін
const AuthContext = createContext()

// AuthProvider компоненті - барлық қолданбаны пайдаланушы деректерімен қамтамасыз етеді
export const AuthProvider = ({ children }) => {
    // Пайдаланушы деректері
    const [user, setUser] = useState(null) // Қазіргі пайдаланушы
    const [isAuthenticated, setIsAuthenticated] = useState(false) // Кірген бе?
    const [isLoading, setIsLoading] = useState(true) // Жүктелуде ме?

    // Қолданба іске қосылғанда бір рет іске қосылады
    useEffect(() => {
        // Сақталған сессияны тексеру
        const checkAuth = async () => {
            // localStorage-тан токен мен пайдаланушы деректерін аламыз
            const token = localStorage.getItem('token')
            const savedUser = localStorage.getItem('user')
            
            // Егер токен мен пайдаланушы деректері бар болса
            if (token && savedUser) {
                try {
                    // JSON-ды объектке айналдырамыз
                    const parsedUser = JSON.parse(savedUser)
                    setUser(parsedUser)
                    setIsAuthenticated(true)
                    
                    // Токендің дұрыстығын тексеру (серверге сұрау жіберу)
                    try {
                        const response = await authAPI.getCurrentUser()
                        if (response.success) {
                            // Егер токен дұрыс болса, жаңа деректерді сақтаймыз
                            setUser(response.data)
                            localStorage.setItem('user', JSON.stringify(response.data))
                        }
                    } catch (error) {
                        // Токен дұрыс емес, шығамыз
                        console.error('Invalid token:', error)
                        localStorage.removeItem('token')
                        localStorage.removeItem('user')
                        setUser(null)
                        setIsAuthenticated(false)
                    }
                } catch (error) {
                    // JSON парсинг қатесі
                    console.error('Error parsing saved user:', error)
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                }
            }
            setIsLoading(false) // Жүктеу аяқталды
        }
        
        checkAuth()
    }, [])

    // Кіру функциясы
    const login = async (credentials) => {
        setIsLoading(true)
        try {
            // Серверге кіру сұрауы жібереміз
            const response = await authAPI.login(credentials)
            
            if (response.success) {
                // Кіру сәтті болса, пайдаланушы деректерін сақтаймыз
                setUser(response.data.user)
                setIsAuthenticated(true)
                return {
                    success: true,
                    user: response.data.user
                }
            }
            
            // Кіру сәтсіз болса
            return {
                success: false,
                error: response.message || 'Жүйеге кіру қатесі'
            }
        } catch (error) {
            // Қате болса
            return {
                success: false,
                error: error.message || 'Жүйеге кіру қатесі'
            }
        } finally {
            setIsLoading(false)
        }
    }

    // Шығу функциясы
    const logout = async () => {
        try {
            // Серверге шығу сұрауы жібереміз
            await authAPI.logout()
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            // Қандай жағдайда да пайдаланушы деректерін тазартамыз
            setUser(null)
            setIsAuthenticated(false)
        }
    }

    // Профильді жаңарту функциясы
    const updateProfile = async (updatedData) => {
        try {
            setIsLoading(true)
            // Болашақта мұнда профильді жаңарту үшін API сұрауы болады
            const updatedUser = { ...user, ...updatedData }
            setUser(updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser))
            return { success: true }
        } catch (error) {
            return { success: false, error: error.message }
        } finally {
            setIsLoading(false)
        }
    }

    // Барлық қажетті деректерді объектке жинаймыз
    const value = {
        user,                    // Қазіргі пайдаланушы
        isAuthenticated,         // Кірген бе?
        isLoading,              // Жүктелуде ме?
        login,                  // Кіру функциясы
        logout,                 // Шығу функциясы
        updateProfile           // Профильді жаңарту функциясы
    }

    // Контекстті барлық қолданбаға береді
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// useAuth hook - контекстті қолдану үшін
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
