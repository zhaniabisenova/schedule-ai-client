/**
 * Модальное окно для создания/редактирования занятия
 */

import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { Save } from 'react-bootstrap-icons';

const LessonModal = ({ show, onHide, lesson, onSave }) => {
  const [formData, setFormData] = useState({
    dayOfWeek: 'MONDAY',
    timeSlotId: 1,
    classroomId: '',
    teachingLoadId: '',
    lessonType: 'LECTURE',
    subgroupNumber: null,
    isDoubleLesson: false
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lesson) {
      setFormData({
        dayOfWeek: lesson.dayOfWeek,
        timeSlotId: lesson.timeSlotId,
        classroomId: lesson.classroomId,
        teachingLoadId: lesson.teachingLoadId,
        lessonType: lesson.lessonType,
        subgroupNumber: lesson.subgroupNumber,
        isDoubleLesson: lesson.isDoubleLesson
      });
    }
  }, [lesson]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await onSave(formData);
      onHide();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {lesson ? 'Сабақты өңдеу' : 'Жаңа сабақ қосу'}
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Апта күні</Form.Label>
            <Form.Select 
              value={formData.dayOfWeek}
              onChange={(e) => handleChange('dayOfWeek', e.target.value)}
              required
            >
              <option value="MONDAY">Дүйсенбі</option>
              <option value="TUESDAY">Сейсенбі</option>
              <option value="WEDNESDAY">Сәрсенбі</option>
              <option value="THURSDAY">Бейсенбі</option>
              <option value="FRIDAY">Жұма</option>
              <option value="SATURDAY">Сенбі</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Уақыт слоты</Form.Label>
            <Form.Select 
              value={formData.timeSlotId}
              onChange={(e) => handleChange('timeSlotId', parseInt(e.target.value))}
              required
            >
              <option value="1">08:00-09:30</option>
              <option value="2">09:40-11:10</option>
              <option value="3">11:30-13:00</option>
              <option value="4">13:10-14:40</option>
              <option value="5">14:50-16:20</option>
              <option value="6">16:30-18:00</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Сабақ түрі</Form.Label>
            <Form.Select 
              value={formData.lessonType}
              onChange={(e) => handleChange('lessonType', e.target.value)}
              required
            >
              <option value="LECTURE">Дәріс</option>
              <option value="PRACTICE">Практика</option>
              <option value="LAB">Зертхана</option>
              <option value="PHYSICAL_EDUCATION">Дене шынықтыру</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Аудитория ID</Form.Label>
            <Form.Control
              type="number"
              value={formData.classroomId}
              onChange={(e) => handleChange('classroomId', parseInt(e.target.value))}
              required
              placeholder="Аудитория ID енгізіңіз"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Жүктеме ID</Form.Label>
            <Form.Control
              type="number"
              value={formData.teachingLoadId}
              onChange={(e) => handleChange('teachingLoadId', parseInt(e.target.value))}
              required
              placeholder="Teaching Load ID енгізіңіз"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Топ нөмірі (опционально)</Form.Label>
            <Form.Control
              type="number"
              value={formData.subgroupNumber || ''}
              onChange={(e) => handleChange('subgroupNumber', e.target.value ? parseInt(e.target.value) : null)}
              placeholder="Топ нөмірін енгізіңіз"
            />
            <Form.Text className="text-muted">
              Егер барлық топ үшін болса, бос қалдырыңыз
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check 
              type="checkbox"
              label="Қосарланған сабақ"
              checked={formData.isDoubleLesson}
              onChange={(e) => handleChange('isDoubleLesson', e.target.checked)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Жабу
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Сақталуда...' : (
              <>
                <Save className="me-2" />
                Сақтау
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default LessonModal;

