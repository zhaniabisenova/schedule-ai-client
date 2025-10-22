import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Form, Alert } from 'react-bootstrap'
import { Button } from '../components/ui/Button.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import './Login.css'

export const Login = () => {
    const navigate = useNavigate()
    const { login, isLoading, isAuthenticated } = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [selectedRole, setSelectedRole] = useState('student')

    // Если пользователь уже авторизован, перенаправляем на главную
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        
        const result = await login(formData)
        if (result.success) {
            navigate('/')
        } else {
            setError(result.error || 'Жүйеге кіру қатесі')
        }
    }

    // Тестовые данные для быстрого входа
    const testAccounts = {
        student: {
            email: 'student@university.kz',
            password: 'student123',
            label: 'Студент'
        },
        teacher: {
            email: 'teacher@university.kz',
            password: 'teacher123',
            label: 'Оқытушы'
        },
        dispatcher: {
            email: 'dispatcher@university.kz',
            password: 'dispatcher123',
            label: 'Диспетчер'
        },
        admin: {
            email: 'admin@university.kz',
            password: 'admin123',
            label: 'Администратор'
        }
    }

    const fillTestAccount = (role) => {
        setSelectedRole(role)
        setFormData({
            email: testAccounts[role].email,
            password: testAccounts[role].password
        })
        setError('')
    }

    return (
        <div className="login-page">
            <Container className="min-vh-100 d-flex align-items-center justify-content-center py-4">
                <Row className="w-100 justify-content-center">
                    <Col xs={12} sm={10} md={8} lg={5} xl={4}>
                        <Card className="login-card shadow-lg">
                            <Card.Header className="text-center bg-primary text-white py-4">
                                <h2 className="mb-2">📚 Кесте AI</h2>
                                <p className="mb-0">Университет кестесін басқару жүйесі</p>
                            </Card.Header>
                            
                            <Card.Body className="p-4">
                                <h4 className="text-center mb-4">Жүйеге кіру</h4>
                                
                                {error && (
                                    <Alert variant="danger" dismissible onClose={() => setError('')}>
                                        {error}
                                    </Alert>
                                )}
                                
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Электрондық пошта</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="email@university.kz"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            autoComplete="email"
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-4">
                                        <Form.Label>Құпия сөз</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Құпия сөзді енгізіңіз"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            autoComplete="current-password"
                                        />
                                    </Form.Group>
                                    
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-100 mb-3"
                                        disabled={isLoading}
                                        size="lg"
                                    >
                                        {isLoading ? 'Кіру...' : 'Кіру'}
                                    </Button>
                                </Form>

                                {/* Тестовые аккаунты для разработки */}
                                <div className="test-accounts mt-4 pt-3 border-top">
                                    <p className="text-center text-muted mb-2 small">
                                        <strong>Тестілеу үшін:</strong>
                                    </p>
                                    <div className="d-flex gap-2 flex-wrap justify-content-center">
                                        {Object.entries(testAccounts).map(([role, data]) => (
                                            <Button
                                                key={role}
                                                variant={selectedRole === role ? 'primary' : 'outline-primary'}
                                                size="sm"
                                                onClick={() => fillTestAccount(role)}
                                            >
                                                {data.label}
                                            </Button>
                                        ))}
                                    </div>
                                    <p className="text-center text-muted mt-2 mb-0" style={{ fontSize: '0.75rem' }}>
                                        Рөлді таңдап, автоматты толтыру
                                    </p>
                                </div>
                            </Card.Body>
                            
                            <Card.Footer className="text-center text-muted py-3">
                                <small>© 2025 Кесте AI. Барлық құқықтар қорғалған.</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}