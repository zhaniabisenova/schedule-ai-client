import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { House, Calendar3, Bell, Person, Upload, Grid, PeopleFill, Book, FileEarmarkSpreadsheet } from 'react-bootstrap-icons'
import { useAuth } from '../../hooks/useAuth.jsx'

export const MobileNav = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useAuth()

    const isActive = (path) => location.pathname === path

    const getNavItems = () => {
        if (!user) return []

        const commonItems = [
            { path: '/', label: 'Басты', icon: House }
        ]

        if (user.role === 'student') {
            return [
                ...commonItems,
                { path: '/schedule', label: 'Кесте', icon: Calendar3 },
                { path: '/notifications', label: 'Хабар', icon: Bell },
                { path: '/profile', label: 'Профиль', icon: Person }
            ]
        }

        if (user.role === 'teacher') {
            return [
                ...commonItems,
                { path: '/schedule', label: 'Кесте', icon: Calendar3 },
                { path: '/notifications', label: 'Хабар', icon: Bell },
                { path: '/profile', label: 'Профиль', icon: Person }
            ]
        }

        if (user.role === 'dispatcher') {
            return [
                ...commonItems,
                { path: '/references', label: 'Анықтама', icon: Book },
                { path: '/import', label: 'Импорт', icon: FileEarmarkSpreadsheet },
                { path: '/dispatcher', label: 'Кесте', icon: Grid },
                { path: '/profile', label: 'Профиль', icon: Person }
            ]
        }

        if (user.role === 'admin') {
            return [
                ...commonItems,
                { path: '/admin', label: 'Қолданушы', icon: PeopleFill },
                { path: '/references', label: 'Анықтама', icon: Book },
                { path: '/import', label: 'Импорт', icon: FileEarmarkSpreadsheet },
                { path: '/profile', label: 'Профиль', icon: Person }
            ]
        }

        return commonItems
    }

    return (
        <nav className="mobile-bottom-nav mobile-only">
            {getNavItems().map((item) => {
                const IconComponent = item.icon
                return (
                    <button
                        key={item.path}
                        className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                        onClick={() => navigate(item.path)}
                    >
                        <IconComponent size={22} className="icon" />
                        <span className="label">{item.label}</span>
                    </button>
                )
            })}
        </nav>
    )
}
