import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ScheduleView } from '../components/shedule/ScheduleView.jsx'
import { useSchedule } from '../hooks/useSchedule.jsx'
import { Loader } from '../components/ui/Loader.jsx'

export const Schedule = () => {
    const navigate = useNavigate()
    const { schedule, isLoading, error } = useSchedule()

    const handleLessonClick = (lesson) => {
        console.log('Clicked lesson:', lesson)
        // Здесь можно добавить модальное окно с деталями занятия
    }

    if (isLoading) {
        return (
            <Container className="min-vh-100 d-flex align-items-center justify-content-center">
                <Loader text="Загрузка расписания..." />
            </Container>
        )
    }

    return (
        <Container className="min-vh-100 py-4">
            <Row>
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>Расписание занятий</h2>
                        <div>
                            <Button
                                variant="outline-primary"
                                onClick={() => navigate('/')}
                                className="me-2"
                            >
                                Назад
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => navigate('/upload')}
                            >
                                Загрузить расписание
                            </Button>
                        </div>
                    </div>

                    {error && (
                        <Card className="mb-4">
                            <Card.Body>
                                <div className="alert alert-danger" role="alert">
                                    Ошибка загрузки расписания: {error}
                                </div>
                            </Card.Body>
                        </Card>
                    )}

                    <ScheduleView
                        schedule={schedule}
                        onLessonClick={handleLessonClick}
                    />
                </Col>
            </Row>
        </Container>
    )
}