/**
 * Редактор расписания с визуализацией
 */

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Badge, Table } from 'react-bootstrap';
import { 
  ArrowLeft, 
  Calendar3, 
  Clock,
  GeoAlt,
  Person,
  Book,
  ExclamationTriangle,
  CheckCircle,
  Trash,
  PencilSquare
} from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import scheduleAPI from '../services/scheduleAPI';
import LessonModal from '../components/schedule/LessonModal';
import './ScheduleEditor.css';

const DAYS = [
  { key: 'MONDAY', label: 'Дүйсенбі' },
  { key: 'TUESDAY', label: 'Сейсенбі' },
  { key: 'WEDNESDAY', label: 'Сәрсенбі' },
  { key: 'THURSDAY', label: 'Бейсенбі' },
  { key: 'FRIDAY', label: 'Жұма' },
  { key: 'SATURDAY', label: 'Сенбі' }
];

const TIME_SLOTS = [
  '08:00-09:30',
  '09:40-11:10',
  '11:30-13:00',
  '13:10-14:40',
  '14:50-16:20',
  '16:30-18:00'
];

const ScheduleEditor = () => {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
  
  const [schedule, setSchedule] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);

  useEffect(() => {
    if (scheduleId) {
      loadSchedule();
    }
  }, [scheduleId]);

  const loadSchedule = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [scheduleData, conflictsData, evaluationData] = await Promise.all([
        scheduleAPI.getById(scheduleId),
        scheduleAPI.checkConflicts(scheduleId),
        scheduleAPI.evaluate(scheduleId)
      ]);
      
      setSchedule(scheduleData);
      setLessons(scheduleData.lessons || []);
      setConflicts(conflictsData.conflicts || []);
      setEvaluation(evaluationData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm('Сабақты өшіруге сенімдісіз бе?')) {
      return;
    }

    try {
      await scheduleAPI.lessons.delete(lessonId);
      await loadSchedule();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson);
    setShowLessonModal(true);
  };

  const handleAddLesson = () => {
    setEditingLesson(null);
    setShowLessonModal(true);
  };

  const handleSaveLesson = async (lessonData) => {
    try {
      if (editingLesson) {
        await scheduleAPI.lessons.update(editingLesson.id, lessonData);
      } else {
        await scheduleAPI.lessons.create({
          ...lessonData,
          scheduleId: parseInt(scheduleId)
        });
      }
      await loadSchedule();
      setShowLessonModal(false);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const getLessonsByDayAndTime = (day, timeSlotIndex) => {
    return lessons.filter(
      lesson => lesson.dayOfWeek === day && lesson.timeSlot.pairNumber === timeSlotIndex + 1
    );
  };

  const getLessonTypeLabel = (type) => {
    const types = {
      'LECTURE': 'Дәріс',
      'PRACTICE': 'Практика',
      'LAB': 'Зертхана',
      'PHYSICAL_EDUCATION': 'Дене шынықтыру'
    };
    return types[type] || type;
  };

  const getLessonTypeBadgeVariant = (type) => {
    const variants = {
      'LECTURE': 'primary',
      'PRACTICE': 'success',
      'LAB': 'warning',
      'PHYSICAL_EDUCATION': 'info'
    };
    return variants[type] || 'secondary';
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Жүктелуде...</p>
      </Container>
    );
  }

  if (!schedule) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <ExclamationTriangle className="me-2" />
          Кесте табылмады
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="schedule-editor">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Button 
                variant="link" 
                className="p-0 mb-2"
                onClick={() => navigate('/dispatcher')}
              >
                <ArrowLeft className="me-2" />
                Артқа
              </Button>
              <h2><Calendar3 className="me-2" />{schedule.name}</h2>
                <p className="text-muted">
                {schedule.academicYear} оқу жылы • {schedule.semesterNumber}-семестр • {lessons.length} сабақ
              </p>
            </div>
            <Button variant="primary" onClick={handleAddLesson}>
              Жаңа сабақ қосу
            </Button>
          </div>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          <ExclamationTriangle className="me-2" />
          {error}
        </Alert>
      )}

      {/* Статистика и конфликты */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <h6>Жалпы баға</h6>
              {evaluation && (
                <div>
                  <h2>{evaluation.totalPenalty}</h2>
                  {evaluation.totalPenalty === 0 ? (
                    <Badge bg="success"><CheckCircle /> Мінсіз</Badge>
                  ) : evaluation.totalPenalty < 100 ? (
                    <Badge bg="info">Өте жақсы</Badge>
                  ) : evaluation.totalPenalty < 500 ? (
                    <Badge bg="warning">Жақсы</Badge>
                  ) : (
                    <Badge bg="danger">Жақсарту қажет</Badge>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <h6>Қатты бұзушылықтар</h6>
              <h2 className={evaluation?.breakdown.hard > 0 ? 'text-danger' : 'text-success'}>
                {evaluation?.breakdown.hard || 0}
              </h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <h6>Жұмсақ бұзушылықтар</h6>
              <h2 className="text-warning">{evaluation?.breakdown.soft || 0}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Конфликты */}
      {conflicts.length > 0 && (
        <Alert variant="warning" className="mb-4">
          <ExclamationTriangle className="me-2" />
          <strong>Табылған конфликттер: {conflicts.length}</strong>
          <div className="mt-2">
            {conflicts.slice(0, 3).map((conflict, idx) => (
              <div key={idx} className="small">
                • {conflict.lesson.discipline} ({conflict.lesson.group}) - {conflict.conflicts[0].message}
              </div>
            ))}
            {conflicts.length > 3 && (
              <div className="small text-muted">... және тағы {conflicts.length - 3}</div>
            )}
          </div>
        </Alert>
      )}

      {/* Таблица расписания */}
      <Card>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table bordered hover className="schedule-table mb-0">
              <thead>
                <tr>
                  <th className="time-column">Уақыт</th>
                  {DAYS.map(day => (
                    <th key={day.key} className="day-column">{day.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIME_SLOTS.map((time, timeIndex) => (
                  <tr key={timeIndex}>
                    <td className="time-cell">
                      <Clock className="me-2" />
                      <strong>{time}</strong>
                    </td>
                    {DAYS.map(day => {
                      const dayLessons = getLessonsByDayAndTime(day.key, timeIndex);
                      return (
                        <td key={day.key} className="lesson-cell">
                          {dayLessons.length > 0 ? (
                            dayLessons.map(lesson => (
                              <div 
                                key={lesson.id} 
                                className={`lesson-card lesson-${lesson.lessonType.toLowerCase()}`}
                                onClick={() => setSelectedLesson(lesson)}
                              >
                                <div className="lesson-header">
                                  <Badge bg={getLessonTypeBadgeVariant(lesson.lessonType)} className="lesson-type">
                                    {getLessonTypeLabel(lesson.lessonType)}
                                  </Badge>
                                  <div className="lesson-actions">
                                    <Button 
                                      size="sm" 
                                      variant="link" 
                                      className="p-0 me-1"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditLesson(lesson);
                                      }}
                                    >
                                      <PencilSquare size={14} />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="link" 
                                      className="p-0 text-danger"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteLesson(lesson.id);
                                      }}
                                    >
                                      <Trash size={14} />
                                    </Button>
                                  </div>
                                </div>
                                <div className="lesson-info">
                                  <div className="lesson-title">
                                    <Book size={14} className="me-1" />
                                    {lesson.teachingLoad.curriculum.discipline.name}
                                  </div>
                                  <div className="lesson-group">
                                    {lesson.teachingLoad.group.name}
                                    {lesson.subgroupNumber && ` (${lesson.subgroupNumber}-топ)`}
                                  </div>
                                  <div className="lesson-teacher">
                                    <Person size={14} className="me-1" />
                                    {lesson.teachingLoad.teacher.firstName} {lesson.teachingLoad.teacher.lastName}
                                  </div>
                                  <div className="lesson-room">
                                    <GeoAlt size={14} className="me-1" />
                                    {lesson.classroom.number} ({lesson.classroom.building})
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="empty-cell">Бос</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Модальное окно для редактирования/создания занятия */}
      <LessonModal
        show={showLessonModal}
        onHide={() => setShowLessonModal(false)}
        lesson={editingLesson}
        onSave={handleSaveLesson}
      />
    </Container>
  );
};

export default ScheduleEditor;

