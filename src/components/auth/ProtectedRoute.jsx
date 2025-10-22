import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'
import { Loader } from '../ui/Loader.jsx'

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, isLoading, user } = useAuth()

    if (isLoading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <Loader text="Жүктелуде..." centered />
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    // Проверка ролей, если указаны
    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger text-center">
                    <h4>Қатынасу құқығы жоқ</h4>
                    <p>Бұл бетке қол жеткізу үшін сізде жеткілікті рұқсат жоқ.</p>
                </div>
            </div>
        )
    }

    return children
}
