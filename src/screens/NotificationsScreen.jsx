import React from 'react'
import { Container, Row, Col, Card, Badge } from 'react-bootstrap'
import { Bell, ExclamationTriangle, InfoCircle, XCircle, CheckCircle } from 'react-bootstrap-icons'
import { useAuth } from '../hooks/useAuth.jsx'
import './NotificationsScreen.css'

export const NotificationsScreen = () => {
    const { user } = useAuth()

    // Моковые уведомления
    const notifications = [
        {
            id: 1,
            title: 'Кесте өзгерді',
            message: 'Ертең сабақтарыңыз 301 аудиторияға көшірілді',
            type: 'warning',
            time: '10 минут бұрын',
            read: false
        },
        {
            id: 2,
            title: 'Жаңа тапсырма',
            message: 'Математика пәнінен жаңа үй жұмысы берілді',
            type: 'info',
            time: '1 сағат бұрын',
            read: false
        },
        {
            id: 3,
            title: 'Емтихан жариялан',
            message: 'Программалау пәні бойынша емтихан күні белгіленді - 25 қараша',
            type: 'danger',
            time: '2 сағат бұрын',
            read: true
        },
        {
            id: 4,
            title: 'Сәттілік!',
            message: 'Өткен аптадағы барлық сабақтарға қатысқаныңыз үшін рахмет!',
            type: 'success',
            time: '1 күн бұрын',
            read: true
        }
    ]

    const getTypeColor = (type) => {
        const colors = {
            warning: 'warning',
            info: 'info',
            danger: 'danger',
            success: 'success'
        }
        return colors[type] || 'secondary'
    }

    const getTypeIcon = (type) => {
        const icons = {
            warning: ExclamationTriangle,
            info: InfoCircle,
            danger: XCircle,
            success: CheckCircle
        }
        return icons[type] || Bell
    }

    return (
        <div className="notifications-screen">
            <Container className="py-4">
                <div className="notifications-header mb-4">
                    <h2 className="fw-bold">
                        <Bell size={32} className="me-2 text-primary" />
                        Хабарландырулар
                    </h2>
                    <p className="text-muted">Барлық жаңалықтар мен өзгерістер</p>
                </div>

                <Row>
                    <Col lg={8} className="mx-auto">
                        {notifications.map((notification) => {
                            const IconComponent = getTypeIcon(notification.type)
                            return (
                                <Card 
                                    key={notification.id} 
                                    className={`notification-card mb-3 ${!notification.read ? 'unread' : ''}`}
                                >
                                    <Card.Body>
                                        <div className="d-flex align-items-start">
                                            <div className="notification-icon me-3">
                                                <IconComponent size={24} />
                                            </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <h5 className="mb-0">{notification.title}</h5>
                                                {!notification.read && (
                                                    <Badge bg="primary" pill>Жаңа</Badge>
                                                )}
                                            </div>
                                            <p className="text-muted mb-2">{notification.message}</p>
                                            <small className="text-secondary">
                                                <Badge bg={getTypeColor(notification.type)} className="me-2">
                                                    {notification.type === 'warning' && 'Ескерту'}
                                                    {notification.type === 'info' && 'Ақпарат'}
                                                    {notification.type === 'danger' && 'Маңызды'}
                                                    {notification.type === 'success' && 'Сәттілік'}
                                                </Badge>
                                                {notification.time}
                                            </small>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                            )
                        })}

                        {notifications.length === 0 && (
                            <Card className="text-center py-5">
                                <Card.Body>
                                    <div className="empty-state">
                                        <h3 className="mb-3">📭</h3>
                                        <h5>Хабарландырулар жоқ</h5>
                                        <p className="text-muted">Барлық хабарландыруларыңыз осында көрсетіледі</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}