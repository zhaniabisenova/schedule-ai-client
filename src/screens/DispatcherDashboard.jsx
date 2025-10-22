/**
 * Диспетчер панелі - кестелерді басқару үшін негізгі бет
 * 
 * Бұл бетте диспетчер:
 * - Барлық кестелерді көре алады
 * - Жаңа кесте құрастыра алады
 * - Кестелерді оңтайландыра алады
 * - Кестелерді жариялай алады
 * - Статистиканы көре алады
 * 
 * Қысқасы: бұл диспетчердің "басқару орталығы"
 */

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { 
  Calendar3, 
  PlusCircle, 
  ArrowRepeat, 
  CheckCircle, 
  ExclamationTriangle,
  BarChart,
  Gear
} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import scheduleAPI from '../services/scheduleAPI';
import './DispatcherDashboard.css';

const DispatcherDashboard = () => {
  const navigate = useNavigate(); // Беттер арасында өту үшін
  
  // State деректері (қолданбаның жағдайы)
  const [schedules, setSchedules] = useState([]); // Кестелер тізімі
  const [loading, setLoading] = useState(true); // Жүктелу көрсеткіші
  const [error, setError] = useState(null); // Қате хабарламасы
  const [generating, setGenerating] = useState(false); // Кесте құрастыру көрсеткіші

  // Қолданба іске қосылғанда бір рет іске қосылады
  useEffect(() => {
    loadSchedules(); // Кестелерді жүктеу
  }, []);

  // Кестелерді серверден жүктеу функциясы
  const loadSchedules = async () => {
    try {
      setLoading(true); // Жүктеу көрсеткішін іске қосу
      setError(null); // Қате хабарламасын тазарту
      const data = await scheduleAPI.getAll(); // API-дан кестелерді алу
      setSchedules(data); // Кестелерді state-ке сақтау
    } catch (err) {
      setError(err.message); // Қатені көрсету
    } finally {
      setLoading(false); // Жүктеу көрсеткішін өшіру
    }
  };

  // Жаңа кесте құрастыру функциясы
  const handleGenerateSchedule = async () => {
    try {
      setGenerating(true); // Құрастыру көрсеткішін іске қосу
      setError(null); // Қате хабарламасын тазарту
      
      // Тест үшін бірінші белсенді семестрді қолданамыз
      // Нақты қолданбада семестрді таңдау мүмкіндігі болуы керек
      const result = await scheduleAPI.generate(1);
      
      // Нәтижені көрсету
      alert(`Расписание успешно сгенерировано!\nРазмещено: ${result.result.placedCount}/${result.result.totalTasks}\nОценка: ${result.result.evaluation.totalPenalty}`);
      
      // Тізімді жаңарту
      await loadSchedules();
    } catch (err) {
      setError(err.message); // Қатені көрсету
    } finally {
      setGenerating(false); // Құрастыру көрсеткішін өшіру
    }
  };

  // Кестені оңтайландыру функциясы
  const handleOptimize = async (scheduleId) => {
    try {
      setError(null); // Қате хабарламасын тазарту
      const result = await scheduleAPI.optimize(scheduleId, 50); // 50 итерациямен оңтайландыру
      alert(`Оптимизация завершена!\nБыло: ${result.result.before}\nСтало: ${result.result.after}\nУлучшение: ${result.result.improvement}`);
      await loadSchedules(); // Тізімді жаңарту
    } catch (err) {
      setError(err.message); // Қатені көрсету
    }
  };

  // Кестені жариялау функциясы
  const handlePublish = async (scheduleId) => {
    // Растау сұрауы
    if (!window.confirm('Вы уверены что хотите опубликовать это расписание?')) {
      return;
    }

    try {
      setError(null); // Қате хабарламасын тазарту
      await scheduleAPI.publish(scheduleId); // Кестені жариялау
      alert('Расписание успешно опубликовано!');
      await loadSchedules(); // Тізімді жаңарту
    } catch (err) {
      setError(err.message); // Қатені көрсету
    }
  };

  // Кестенің мәртебесін көрсету функциясы
  const getStatusBadge = (schedule) => {
    if (schedule.isPublished) {
      return <Badge bg="success"><CheckCircle /> Опубликовано</Badge>;
    }
    if (schedule.isActive) {
      return <Badge bg="primary"><ArrowRepeat /> Активно</Badge>;
    }
    return <Badge bg="secondary">Черновик</Badge>;
  };

  // Кестенің сапасын көрсету функциясы
  const getQualityBadge = (score) => {
    if (!score) return null; // Егер балл жоқ болса, ештеңе көрсетпеу
    
    if (score === 0) {
      return <Badge bg="success">Идеально</Badge>;
    } else if (score < 100) {
      return <Badge bg="info">Отлично</Badge>;
    } else if (score < 500) {
      return <Badge bg="warning">Хорошо</Badge>;
    } else {
      return <Badge bg="danger">Требует улучшения</Badge>;
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Жүктелуде...</p>
      </Container>
    );
  }

  return (
    <Container fluid className="dispatcher-dashboard">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2><Calendar3 className="me-2" />Диспетчер панелі</h2>
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleGenerateSchedule}
              disabled={generating}
            >
              {generating ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Құрастырылуда...
                </>
              ) : (
                <>
                  <PlusCircle className="me-2" />
                  Жаңа кесте құрастыру
                </>
              )}
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

      <Row className="mb-4">
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-icon bg-primary">
                <Calendar3 />
              </div>
              <div className="stat-info">
                <h3>{schedules.length}</h3>
                <p>Барлық кестелер</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-icon bg-success">
                <CheckCircle />
              </div>
              <div className="stat-info">
                <h3>{schedules.filter(s => s.isPublished).length}</h3>
                <p>Жарияланған</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-icon bg-warning">
                <ArrowRepeat />
              </div>
              <div className="stat-info">
                <h3>{schedules.filter(s => s.isActive && !s.isPublished).length}</h3>
                <p>Жұмыс үстінде</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-icon bg-info">
                <BarChart />
              </div>
              <div className="stat-info">
                <h3>{schedules.reduce((sum, s) => sum + (s._count?.lessons || 0), 0)}</h3>
                <p>Барлық сабақтар</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <h4 className="mb-3">Барлық кестелер</h4>
          {schedules.length === 0 ? (
            <Card>
              <Card.Body className="text-center py-5">
                <Calendar3 size={64} className="text-muted mb-3" />
                <h5>Кестелер жоқ</h5>
                <p className="text-muted">Жаңа кесте құрастыру үшін жоғарыдағы батырманы басыңыз</p>
              </Card.Body>
            </Card>
          ) : (
            <div className="schedules-grid">
              {schedules.map(schedule => (
                <Card key={schedule.id} className="schedule-card">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5>{schedule.name}</h5>
                        <p className="text-muted mb-1">
                          <small>{schedule.academicYear} оқу жылы • {schedule.semesterNumber}-семестр</small>
                        </p>
                        <p className="text-muted mb-0">
                          <small>{schedule._count?.lessons || 0} сабақ</small>
                        </p>
                      </div>
                      <div className="text-end">
                        {getStatusBadge(schedule)}
                        {schedule.optimizationScore && (
                          <div className="mt-2">
                            {getQualityBadge(schedule.optimizationScore)}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="d-flex gap-2 flex-wrap">
                      <Button 
                        size="sm" 
                        variant="outline-primary"
                        onClick={() => navigate(`/dispatcher/schedule/${schedule.id}`)}
                      >
                        <Calendar3 className="me-1" /> Ашу
                      </Button>
                      
                      {!schedule.isPublished && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline-info"
                            onClick={() => handleOptimize(schedule.id)}
                          >
                            <ArrowRepeat className="me-1" /> Оңтайландыру
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline-success"
                            onClick={() => handlePublish(schedule.id)}
                          >
                            <CheckCircle className="me-1" /> Жариялау
                          </Button>
                        </>
                      )}
                      
                      <Button 
                        size="sm" 
                        variant="outline-secondary"
                        onClick={() => navigate(`/dispatcher/schedule/${schedule.id}/stats`)}
                      >
                        <BarChart className="me-1" /> Статистика
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DispatcherDashboard;

