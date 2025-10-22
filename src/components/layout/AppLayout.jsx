import React from 'react'
import { useLocation } from 'react-router-dom'
import { DesktopNav } from './DesktopNav'
import { MobileNav } from './MobileNav'
import { useAuth } from '../../hooks/useAuth.jsx'
import './Layout.css'

export const AppLayout = ({ children }) => {
    const location = useLocation()
    const { isAuthenticated } = useAuth()
    
    // Страницы без навигации
    const noNavPages = ['/login']
    const showNav = !noNavPages.includes(location.pathname)

    return (
        <div className="app-layout">
            {/* Десктопная навигация - сверху */}
            {showNav && isAuthenticated && (
                <DesktopNav className="desktop-nav" />
            )}

            {/* Основной контент */}
            <main className={`main-content ${showNav && isAuthenticated ? 'with-nav' : ''}`}>
                {children}
            </main>

            {/* Мобильная навигация - снизу */}
            {showNav && isAuthenticated && (
                <MobileNav className="mobile-nav" />
            )}
        </div>
    )
}
