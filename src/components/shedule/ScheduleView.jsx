import React, { useState } from 'react'
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap'
import { LessonCard } from './LessonCard.jsx'

export const ScheduleView = ({ 
    schedule = [], 
    onLessonClick,
    className = '' 
}) => {
    const [selectedDay, setSelectedDay] = useState('monday')
    
    const days = [
        { key: 'monday', label: 'Понедельник' },
        { key: 'tuesday', label: 'Вторник' },
        { key: 'wednesday', label: 'Среда' },
        { key: 'thursday', label: 'Четверг' },
        { key: 'friday', label: 'Пятница' },
        { key: 'saturday', label: 'Суббота' }
    ]

    const timeSlots = [
        '08:00', '09:30', '11:00', '12:30', '14:00', '15:30', '17:00'
    ]

    const getLessonsForDay = (day) => {
        return schedule.filter(lesson => lesson.day === day)
    }

    const getLessonAtTime = (day, time) => {
        return schedule.find(lesson => lesson.day === day && lesson.time === time)
    }

    return (
        <Container className={`schedule-view ${className}`}>
            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Header>
                            <h4 className="mb-0">Расписание занятий</h4>
                        </Card.Header>
                        <Card.Body>
                            <div className="d-flex flex-wrap gap-2 mb-3">
                                {days.map(day => (
                                    <Button
                                        key={day.key}
                                        variant={selectedDay === day.key ? 'primary' : 'outline-primary'}
                                        size="sm"
                                        onClick={() => setSelectedDay(day.key)}
                                    >
                                        {day.label}
                                    </Button>
                                ))}
                            </div>
                            
                            <div className="schedule-grid">
                                <Row>
                                    <Col md={2}>
                                        <div className="time-column">
                                            <div className="time-header">Время</div>
                                            {timeSlots.map(time => (
                                                <div key={time} className="time-slot">
                                                    {time}
                                                </div>
                                            ))}
                                        </div>
                                    </Col>
                                    <Col md={10}>
                                        <div className="lessons-column">
                                            <div className="day-header">
                                                {days.find(d => d.key === selectedDay)?.label}
                                            </div>
                                            {timeSlots.map(time => {
                                                const lesson = getLessonAtTime(selectedDay, time)
                                                return (
                                                    <div key={time} className="lesson-slot">
                                                        {lesson ? (
                                                            <LessonCard 
                                                                lesson={lesson}
                                                                onClick={onLessonClick}
                                                            />
                                                        ) : (
                                                            <div className="empty-slot"></div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
