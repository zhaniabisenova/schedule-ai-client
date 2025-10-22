import React from 'react'
import { Card, Badge } from 'react-bootstrap'

export const LessonCard = ({ 
    lesson, 
    onClick, 
    className = '' 
}) => {
    const {
        id,
        subject,
        teacher,
        room,
        time,
        type,
        group,
        day
    } = lesson

    const getTypeColor = (type) => {
        const colors = {
            lecture: 'primary',
            practical: 'success',
            lab: 'warning',
            exam: 'danger'
        }
        return colors[type] || 'secondary'
    }

    return (
        <Card 
            className={`lesson-card ${className}`}
            onClick={() => onClick && onClick(lesson)}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        >
            <Card.Header className="d-flex justify-content-between align-items-center">
                <Badge bg={getTypeColor(type)}>{type}</Badge>
                <small className="text-muted">{time}</small>
            </Card.Header>
            <Card.Body>
                <Card.Title className="h6">{subject}</Card.Title>
                <Card.Text>
                    <div><strong>Преподаватель:</strong> {teacher}</div>
                    <div><strong>Аудитория:</strong> {room}</div>
                    <div><strong>Группа:</strong> {group}</div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
