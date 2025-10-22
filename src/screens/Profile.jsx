import React, { useState } from "react"
import { Container, Row, Col, Card, Form } from "react-bootstrap"
import { useAuth } from "../hooks/useAuth.jsx"
import { Button } from "../components/ui/Button.jsx"
import "./Profile.css"

export const Profile = () => {
    const { user, updateProfile, logout } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || ''
    })
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const result = updateProfile(formData)
        if (result.success) {
            setMessage('Профиль сәтті жаңартылды!')
            setIsEditing(false)
            setTimeout(() => setMessage(''), 3000)
        }
    }

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || ''
        })
        setIsEditing(false)
    }

    const getRoleDisplay = (role) => {
        const roles = {
            student: 'Студент',
            teacher: 'Оқытушы',
            dispatcher: 'Диспетчер'
        }
        return roles[role] || role
    }

    return (
        <div className="profile-page">
            <Container className="py-4">
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <Card className="profile-card shadow">
                            <Card.Header className="bg-primary text-white">
                                <h3 className="mb-0">👤 Профиль</h3>
                            </Card.Header>
                            <Card.Body className="p-4">
                                {message && (
                                    <div className="alert alert-success">{message}</div>
                                )}

                                {!isEditing ? (
                                    /* Режим просмотра */
                                    <div className="profile-view">
                                        <Row className="mb-4">
                                            <Col sm={4} className="fw-bold">Аты-жөні:</Col>
                                            <Col sm={8}>{user?.name}</Col>
                                        </Row>
                                        <Row className="mb-4">
                                            <Col sm={4} className="fw-bold">Email:</Col>
                                            <Col sm={8}>{user?.email}</Col>
                                        </Row>
                                        <Row className="mb-4">
                                            <Col sm={4} className="fw-bold">Рөлі:</Col>
                                            <Col sm={8}>
                                                <span className="badge bg-primary">
                                                    {getRoleDisplay(user?.role)}
                                                </span>
                                            </Col>
                                        </Row>

                                        {/* Дополнительная информация в зависимости от роли */}
                                        {user?.role === 'student' && (
                                            <>
                                                <Row className="mb-4">
                                                    <Col sm={4} className="fw-bold">Топ:</Col>
                                                    <Col sm={8}>{user.group}</Col>
                                                </Row>
                                                <Row className="mb-4">
                                                    <Col sm={4} className="fw-bold">Факультет:</Col>
                                                    <Col sm={8}>{user.faculty}</Col>
                                                </Row>
                                                <Row className="mb-4">
                                                    <Col sm={4} className="fw-bold">Курс:</Col>
                                                    <Col sm={8}>{user.course}</Col>
                                                </Row>
                                            </>
                                        )}

                                        {user?.role === 'teacher' && (
                                            <>
                                                <Row className="mb-4">
                                                    <Col sm={4} className="fw-bold">Кафедра:</Col>
                                                    <Col sm={8}>{user.department}</Col>
                                                </Row>
                                                <Row className="mb-4">
                                                    <Col sm={4} className="fw-bold">Пәндер:</Col>
                                                    <Col sm={8}>
                                                        {user.subjects?.join(', ')}
                                                    </Col>
                                                </Row>
                                            </>
                                        )}

                                        {user?.role === 'dispatcher' && (
                                            <Row className="mb-4">
                                                <Col sm={4} className="fw-bold">Бөлім:</Col>
                                                <Col sm={8}>{user.department}</Col>
                                            </Row>
                                        )}

                                        <div className="d-flex gap-2 mt-4">
                                            <Button
                                                variant="primary"
                                                onClick={() => setIsEditing(true)}
                                            >
                                                Өзгерту
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={logout}
                                            >
                                                Шығу
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    /* Режим редактирования */
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Аты-жөні</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>

                                        <div className="d-flex gap-2">
                                            <Button type="submit" variant="success">
                                                Сақтау
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                onClick={handleCancel}
                                            >
                                                Болдырмау
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}