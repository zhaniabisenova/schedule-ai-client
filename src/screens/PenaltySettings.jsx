/**
 * Панель настройки весов штрафов
 */

import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap';
import { ArrowLeft, Save, ArrowCounterclockwise } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import './PenaltySettings.css';

const PenaltySettings = () => {
  const navigate = useNavigate();
  
  // Значения по умолчанию из PenaltyCalculator
  const defaultSettings = {
    studentGapPenalty: 50,
    teacherGapPenalty: 5,
    earlyLessonPenalty: 10,
    lateLessonPenalty: 15,
    classroomChangePenalty: 20,
    doubleBlockViolation: 100,
    buildingChangePenalty: 30
  };

  const [settings, setSettings] = useState(defaultSettings);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: parseInt(value) || 0
    }));
  };

  const handleReset = () => {
    setSettings(defaultSettings);
  };

  const handleSave = () => {
    // TODO: Сохранить настройки через API
    console.log('Сохранение настроек:', settings);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getPenaltyLevel = (value) => {
    if (value === 0) return 'Отключено';
    if (value < 10) return 'Очень низкий';
    if (value < 30) return 'Низкий';
    if (value < 60) return 'Средний';
    if (value < 100) return 'Высокий';
    return 'Очень высокий';
  };

  const getPenaltyColor = (value) => {
    if (value === 0) return '#95a5a6';
    if (value < 10) return '#3498db';
    if (value < 30) return '#2ecc71';
    if (value < 60) return '#f39c12';
    if (value < 100) return '#e67e22';
    return '#e74c3c';
  };

  return (
    <Container fluid className="penalty-settings">
      <Row className="mb-4">
        <Col>
          <Button 
            variant="link" 
            className="p-0 mb-2"
            onClick={() => navigate('/dispatcher')}
          >
            <ArrowLeft className="me-2" />
            Артқа
          </Button>
          <h2>Айыппұл салмағын баптау</h2>
          <p className="text-muted">
            Кесте құрастыру кезінде әр түрлі жағдайларға қатысты айыппұл салмағын өзгертіңіз
          </p>
        </Col>
      </Row>

      {showSuccess && (
        <Alert variant="success" dismissible onClose={() => setShowSuccess(false)}>
          Параметрлер сәтті сақталды!
        </Alert>
      )}

      <Row>
        <Col lg={8}>
          <Card className="settings-card">
            <Card.Body>
              <h5 className="mb-4">Жұмсақ шектеулер</h5>
              <p className="text-muted small mb-4">
                Бұл параметрлер кесте сапасына әсер етеді, бірақ оны жарамсыз етпейді
              </p>

              {/* Студент окна */}
              <div className="setting-item">
                <div className="setting-header">
                  <div>
                    <h6>Студенттердің бос сағаттары</h6>
                    <p className="text-muted small mb-0">
                      Студенттер үшін сабақтар арасындағы бос сағаттардың айыппұлы
                    </p>
                  </div>
                  <div className="setting-value">
                    <Badge 
                      style={{ backgroundColor: getPenaltyColor(settings.studentGapPenalty) }}
                    >
                      {getPenaltyLevel(settings.studentGapPenalty)}
                    </Badge>
                    <div className="value-display">{settings.studentGapPenalty}</div>
                  </div>
                </div>
                <Form.Range
                  min="0"
                  max="100"
                  value={settings.studentGapPenalty}
                  onChange={(e) => handleChange('studentGapPenalty', e.target.value)}
                  className="custom-range"
                />
              </div>

              {/* Преподаватель окна */}
              <div className="setting-item">
                <div className="setting-header">
                  <div>
                    <h6>Оқытушылардың бос сағаттары</h6>
                    <p className="text-muted small mb-0">
                      Оқытушылар үшін сабақтар арасындағы бос сағаттардың айыппұлы
                    </p>
                  </div>
                  <div className="setting-value">
                    <Badge 
                      style={{ backgroundColor: getPenaltyColor(settings.teacherGapPenalty) }}
                    >
                      {getPenaltyLevel(settings.teacherGapPenalty)}
                    </Badge>
                    <div className="value-display">{settings.teacherGapPenalty}</div>
                  </div>
                </div>
                <Form.Range
                  min="0"
                  max="100"
                  value={settings.teacherGapPenalty}
                  onChange={(e) => handleChange('teacherGapPenalty', e.target.value)}
                  className="custom-range"
                />
              </div>

              {/* Ранние пары */}
              <div className="setting-item">
                <div className="setting-header">
                  <div>
                    <h6>Ерте сабақтар</h6>
                    <p className="text-muted small mb-0">
                      8:30-ға дейінгі сабақтардың айыппұлы
                    </p>
                  </div>
                  <div className="setting-value">
                    <Badge 
                      style={{ backgroundColor: getPenaltyColor(settings.earlyLessonPenalty) }}
                    >
                      {getPenaltyLevel(settings.earlyLessonPenalty)}
                    </Badge>
                    <div className="value-display">{settings.earlyLessonPenalty}</div>
                  </div>
                </div>
                <Form.Range
                  min="0"
                  max="100"
                  value={settings.earlyLessonPenalty}
                  onChange={(e) => handleChange('earlyLessonPenalty', e.target.value)}
                  className="custom-range"
                />
              </div>

              {/* Поздние пары */}
              <div className="setting-item">
                <div className="setting-header">
                  <div>
                    <h6>Кеш сабақтар</h6>
                    <p className="text-muted small mb-0">
                      18:00-ден кейінгі сабақтардың айыппұлы
                    </p>
                  </div>
                  <div className="setting-value">
                    <Badge 
                      style={{ backgroundColor: getPenaltyColor(settings.lateLessonPenalty) }}
                    >
                      {getPenaltyLevel(settings.lateLessonPenalty)}
                    </Badge>
                    <div className="value-display">{settings.lateLessonPenalty}</div>
                  </div>
                </div>
                <Form.Range
                  min="0"
                  max="100"
                  value={settings.lateLessonPenalty}
                  onChange={(e) => handleChange('lateLessonPenalty', e.target.value)}
                  className="custom-range"
                />
              </div>

              {/* Смена аудитории */}
              <div className="setting-item">
                <div className="setting-header">
                  <div>
                    <h6>Аудиторияны ауыстыру</h6>
                    <p className="text-muted small mb-0">
                      Қосарланған сабақта аудиторияны ауыстырудың айыппұлы
                    </p>
                  </div>
                  <div className="setting-value">
                    <Badge 
                      style={{ backgroundColor: getPenaltyColor(settings.classroomChangePenalty) }}
                    >
                      {getPenaltyLevel(settings.classroomChangePenalty)}
                    </Badge>
                    <div className="value-display">{settings.classroomChangePenalty}</div>
                  </div>
                </div>
                <Form.Range
                  min="0"
                  max="100"
                  value={settings.classroomChangePenalty}
                  onChange={(e) => handleChange('classroomChangePenalty', e.target.value)}
                  className="custom-range"
                />
              </div>

              {/* Смена корпуса */}
              <div className="setting-item">
                <div className="setting-header">
                  <div>
                    <h6>Корпусты ауыстыру</h6>
                    <p className="text-muted small mb-0">
                      Сабақтар арасында корпусты ауыстырудың айыппұлы
                    </p>
                  </div>
                  <div className="setting-value">
                    <Badge 
                      style={{ backgroundColor: getPenaltyColor(settings.buildingChangePenalty) }}
                    >
                      {getPenaltyLevel(settings.buildingChangePenalty)}
                    </Badge>
                    <div className="value-display">{settings.buildingChangePenalty}</div>
                  </div>
                </div>
                <Form.Range
                  min="0"
                  max="100"
                  value={settings.buildingChangePenalty}
                  onChange={(e) => handleChange('buildingChangePenalty', e.target.value)}
                  className="custom-range"
                />
              </div>

              {/* Нарушение сдвоенности */}
              <div className="setting-item">
                <div className="setting-header">
                  <div>
                    <h6>Қосарлану талабын бұзу</h6>
                    <p className="text-muted small mb-0">
                      Қосарланған сабақтың бөлінуінің айыппұлы
                    </p>
                  </div>
                  <div className="setting-value">
                    <Badge 
                      style={{ backgroundColor: getPenaltyColor(settings.doubleBlockViolation) }}
                    >
                      {getPenaltyLevel(settings.doubleBlockViolation)}
                    </Badge>
                    <div className="value-display">{settings.doubleBlockViolation}</div>
                  </div>
                </div>
                <Form.Range
                  min="0"
                  max="200"
                  value={settings.doubleBlockViolation}
                  onChange={(e) => handleChange('doubleBlockViolation', e.target.value)}
                  className="custom-range"
                />
              </div>

              <div className="d-flex gap-3 mt-4">
                <Button variant="primary" size="lg" onClick={handleSave}>
                  <Save className="me-2" />
                  Сақтау
                </Button>
                <Button variant="outline-secondary" size="lg" onClick={handleReset}>
                  <ArrowCounterclockwise className="me-2" />
                  Қалпына келтіру
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="info-card">
            <Card.Body>
              <h6>Айыппұл жүйесі туралы</h6>
              <p className="small text-muted">
                Айыппұл жүйесі кесте сапасын бағалау үшін қолданылады. Жоғары салмақ - 
                бұл жағдайды болдырмау керек екенін білдіреді.
              </p>
              
              <h6 className="mt-4">Қатты шектеулер</h6>
              <p className="small text-muted">
                Бұл шектеулерді өзгерту мүмкін емес, олар әрқашан 1000 айыппұл береді:
              </p>
              <ul className="small text-muted">
                <li>Оқытушының екі жерде болуы</li>
                <li>Аудиторияның екі рет ұйымдастырылуы</li>
                <li>Топтың екі жерде болуы</li>
                <li>Аудитория сыйымдылығы жеткіліксіз</li>
                <li>Аудитория түрі сәйкес келмеуі</li>
                <li>Ауысым бұзушылығы</li>
              </ul>

              <h6 className="mt-4">Ұсыныстар</h6>
              <ul className="small text-muted">
                <li>Студенттердің бос сағаттарына жоғары салмақ қойыңыз</li>
                <li>Оқытушылардың бос сағаттары төмен болуы мүмкін</li>
                <li>Корпусты ауыстыруға орташа салмақ жеткілікті</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PenaltySettings;

