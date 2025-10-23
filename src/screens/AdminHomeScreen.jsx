import React, { useState } from 'react'
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge, Alert } from 'react-bootstrap'
import { PersonPlus, Pencil, Trash, Eye, EyeSlash } from 'react-bootstrap-icons'
import { useUsers } from '../hooks/useUsers.jsx'
import './AdminHomeScreen.css'

export const AdminHomeScreen = () => {
    const { users, isLoading, error, createUser, updateUser, deleteUser, fetchUsers } = useUsers()
    
    // Отладочная информация
    console.log('AdminHomeScreen - users:', users)
    console.log('AdminHomeScreen - isLoading:', isLoading)
    console.log('AdminHomeScreen - error:', error)
    
    const [showModal, setShowModal] = useState(false)
    const [modalMode, setModalMode] = useState('create') // 'create' или 'edit'
    const [selectedUser, setSelectedUser] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        role: 'student',
        group: '',
        faculty: '',
        course: '',
        department: '',
        subjects: ''
    })

    const handleShowCreate = () => {
        setModalMode('create')
        setFormData({
            email: '',
            password: '',
            name: '',
            role: 'student',
            group: '',
            faculty: '',
            course: '',
            department: '',
            subjects: ''
        })
        setShowModal(true)
    }

    const handleShowEdit = (user) => {
        setModalMode('edit')
        setSelectedUser(user)
        setFormData({
            email: user.email,
            password: '',
            name: user.name,
            role: user.role,
            group: user.group || '',
            faculty: user.faculty || '',
            course: user.course || '',
            department: user.department || '',
            subjects: user.subjects ? user.subjects.join(', ') : ''
        })
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
        setSelectedUser(null)
        setShowPassword(false)
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const userData = {
            email: formData.email,
            name: formData.name,
            role: formData.role
        }

        // Добавляем пароль только если он указан
        if (formData.password) {
            userData.password = formData.password
        }

        // Добавляем поля в зависимости от роли
        if (formData.role === 'student') {
            userData.group = formData.group
            userData.faculty = formData.faculty
            userData.course = parseInt(formData.course) || 1
        } else if (formData.role === 'teacher') {
            userData.department = formData.department
            userData.subjects = formData.subjects.split(',').map(s => s.trim()).filter(s => s)
        } else if (formData.role === 'dispatcher' || formData.role === 'admin') {
            userData.department = formData.department
        }

        let result
        if (modalMode === 'create') {
            if (!formData.password) {
                alert('Құпия сөз міндетті')
                return
            }
            result = await createUser(userData)
        } else {
            result = await updateUser(selectedUser.id, userData)
        }

        if (result.success) {
            setSuccessMessage(modalMode === 'create' ? 'Пайдаланушы сәтті қосылды!' : 'Деректер сәтті жаңартылды!')
            setTimeout(() => setSuccessMessage(''), 3000)
            handleClose()
        } else {
            alert(result.error)
        }
    }

    const handleDelete = async (id, userName) => {
        if (window.confirm(`"${userName}" пайдаланушысын өшіруге сенімдісіз бе?`)) {
            const result = await deleteUser(id)
            if (result.success) {
                setSuccessMessage('Пайдаланушы сәтті өшірілді!')
                setTimeout(() => setSuccessMessage(''), 3000)
            } else {
                alert(result.error)
            }
        }
    }

    const getRoleName = (role) => {
        const roles = {
            student: 'Студент',
            teacher: 'Оқытушы',
            dispatcher: 'Диспетчер',
            admin: 'Администратор'
        }
        return roles[role] || role
    }

    const getRoleBadgeColor = (role) => {
        const colors = {
            student: 'primary',
            teacher: 'success',
            dispatcher: 'warning',
            admin: 'danger'
        }
        return colors[role] || 'secondary'
    }

    return (
        <div className="admin-home-screen">
            <Container className="py-4">
                <Row className="mb-4">
                    <Col>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h2 className="fw-bold mb-1">Пайдаланушыларды басқару</h2>
                                <p className="text-muted mb-0">Барлық пайдаланушылар тізімі</p>
                            </div>
                            <Button variant="primary" onClick={handleShowCreate}>
                                <PersonPlus size={18} className="me-2" />
                                Қосу
                            </Button>
                        </div>
                    </Col>
                </Row>

                {successMessage && (
                    <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>
                        {successMessage}
                    </Alert>
                )}

                {error && (
                    <Alert variant="danger">{error}</Alert>
                )}

                <Card className="shadow-sm">
                    <Card.Body className="p-0">
                        <div className="table-responsive">
                            <Table hover className="mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Аты-жөні</th>
                                        <th>Email</th>
                                        <th>Рөл</th>
                                        <th>Қосымша ақпарат</th>
                                        <th className="text-end">Әрекеттер</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4">
                                                Жүктелуде...
                                            </td>
                                        </tr>
                                    ) : users.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4 text-muted">
                                                Пайдаланушылар жоқ
                                            </td>
                                        </tr>
                                    ) : (
                                        users.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td className="fw-medium">{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <Badge bg={getRoleBadgeColor(user.role)}>
                                                        {getRoleName(user.role)}
                                                    </Badge>
                                                </td>
                                                <td className="small text-muted">
                                                    {user.role === 'student' && `${user.group} • ${user.faculty}`}
                                                    {user.role === 'teacher' && user.department}
                                                    {(user.role === 'dispatcher' || user.role === 'admin') && user.department}
                                                </td>
                                                <td className="text-end">
                                                    <Button 
                                                        variant="outline-primary" 
                                                        size="sm" 
                                                        className="me-2"
                                                        onClick={() => handleShowEdit(user)}
                                                    >
                                                        <Pencil size={14} />
                                                    </Button>
                                                    {user.role !== 'admin' && (
                                                        <Button 
                                                            variant="outline-danger" 
                                                            size="sm"
                                                            onClick={() => handleDelete(user.id, user.name)}
                                                        >
                                                            <Trash size={14} />
                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>
            </Container>

            {/* Modal для создания/редактирования пользователя */}
            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalMode === 'create' ? 'Жаңа пайдаланушы қосу' : 'Пайдаланушыны өңдеу'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email *</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={modalMode === 'edit'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Құпия сөз {modalMode === 'create' ? '*' : '(жаңартылмаса бос қалдырыңыз)'}
                                    </Form.Label>
                                    <div className="input-group">
                                        <Form.Control
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required={modalMode === 'create'}
                                        />
                                        <Button 
                                            variant="outline-secondary"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                                        </Button>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Аты-жөні *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Рөлі *</Form.Label>
                                    <Form.Select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="student">Студент</option>
                                        <option value="teacher">Оқытушы</option>
                                        <option value="dispatcher">Диспетчер</option>
                                        <option value="admin">Администратор</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Поля для студента */}
                        {formData.role === 'student' && (
                            <Row>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Топ *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="group"
                                            value={formData.group}
                                            onChange={handleChange}
                                            placeholder="ИТ-21-1"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Факультет *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="faculty"
                                            value={formData.faculty}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Курс *</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="course"
                                            value={formData.course}
                                            onChange={handleChange}
                                            min="1"
                                            max="4"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        )}

                        {/* Поля для преподавателя */}
                        {formData.role === 'teacher' && (
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Кафедра *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Пәндер (үтірмен бөлу)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="subjects"
                                            value={formData.subjects}
                                            onChange={handleChange}
                                            placeholder="Математика, Физика"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        )}

                        {/* Поля для диспетчера и админа */}
                        {(formData.role === 'dispatcher' || formData.role === 'admin') && (
                            <Form.Group className="mb-3">
                                <Form.Label>Бөлім *</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        )}

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <Button variant="secondary" onClick={handleClose}>
                                Болдырмау
                            </Button>
                            <Button variant="primary" type="submit" disabled={isLoading}>
                                {isLoading ? 'Сақталуда...' : 'Сақтау'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}