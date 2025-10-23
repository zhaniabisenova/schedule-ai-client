import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { House, Calendar3, Bell, Person, Upload, Grid, PeopleFill, Book, FileEarmarkSpreadsheet } from 'react-bootstrap-icons'
import { useAuth } from '../../hooks/useAuth.jsx'

export const DesktopNav = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const isActive = (path) => location.pathname === path

    const getNavItems = () => {
        if (!user) return []

        const commonItems = [
            { path: '/', label: 'Басты бет', icon: House }
        ]

        if (user.role === 'student') {
            return [
                ...commonItems,
                { path: '/schedule', label: 'Кесте', icon: Calendar3 },
                { path: '/notifications', label: 'Хабарландыру', icon: Bell },
                { path: '/profile', label: 'Профиль', icon: Person }
            ]
        }

        if (user.role === 'teacher') {
            return [
                ...commonItems,
                { path: '/schedule', label: 'Менің кестем', icon: Calendar3 },
                { path: '/notifications', label: 'Хабарландыру', icon: Bell },
                { path: '/profile', label: 'Профиль', icon: Person }
            ]
        }

        if (user.role === 'dispatcher') {
            return [
                ...commonItems,
                { path: '/dispatcher', label: 'Кесте басқару', icon: Grid },
                { path: '/references', label: 'Анықтамалықтар', icon: Book },
                { path: '/import', label: 'Excel импорт', icon: FileEarmarkSpreadsheet },
                { path: '/schedule', label: 'Менің кестем', icon: Calendar3 },
                { path: '/upload', label: 'Деректерді жүктеу', icon: Upload },
                { path: '/profile', label: 'Профиль', icon: Person }
            ]
        }

        if (user.role === 'admin') {
            return [
                ...commonItems,
                { path: '/admin', label: 'Пайдаланушылар', icon: PeopleFill },
                { path: '/references', label: 'Анықтамалықтар', icon: Book },
                { path: '/import', label: 'Excel импорт', icon: FileEarmarkSpreadsheet },
                { path: '/dispatcher', label: 'Кесте басқару', icon: Grid },
                { path: '/schedule', label: 'Кесте', icon: Calendar3 },
                { path: '/profile', label: 'Профиль', icon: Person }
            ]
        }

        return commonItems
    }

    return (
        <Navbar bg="white" variant="light" expand="lg" className="desktop-only shadow-sm">
            <Container fluid>
                <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }} className="fw-bold text-primary">
                    <Grid size={24} className="me-2" />
                    Кесте AI
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {getNavItems().map((item) => {
                            const IconComponent = item.icon
                            return (
                                <Nav.Link
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    active={isActive(item.path)}
                                    className={`nav-link-custom ${isActive(item.path) ? 'active' : ''}`}
                                >
                                    <IconComponent size={18} className="me-2" />
                                    {item.label}
                                </Nav.Link>
                            )
                        })}
                    </Nav>
                    
                    <Nav>
                        <Navbar.Text className="me-3 text-dark">
                            <Person size={18} className="me-2" />
                            <strong>{user?.name}</strong>
                            <span className="text-muted ms-2">
                                ({user?.role === 'student' ? 'Студент' : 
                                  user?.role === 'teacher' ? 'Оқытушы' : 
                                  user?.role === 'dispatcher' ? 'Диспетчер' :
                                  'Администратор'})
                            </span>
                        </Navbar.Text>
                        <Button variant="outline-primary" size="sm" onClick={handleLogout}>
                            Шығу
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
