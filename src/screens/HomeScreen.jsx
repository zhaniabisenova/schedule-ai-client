import React from "react"
import { useNavigate } from "react-router-dom"
import { Container, Row, Col, Card } from "react-bootstrap"
import { Calendar3, Person, BarChart, Upload, Grid, People } from "react-bootstrap-icons"
import { useAuth } from "../hooks/useAuth.jsx"
import { Button } from "../components/ui/Button.jsx"
import "./HomeScreen.css"

export const HomeScreen = () => {
    const navigate = useNavigate()
    const { user } = useAuth()

    // Контент в зависимости от роли
    const getRoleContent = () => {
        if (!user) return null

        if (user.role === 'student') {
            return {
                title: `Сәлем, ${user.name}!`,
                subtitle: `Топ: ${user.group} • ${user.faculty}`,
                features: [
                    {
                        icon: Calendar3,
                        title: 'Менің кестем',
                        description: 'Сіздің топ үшін жеке сабақ кестесін қараңыз',
                        action: () => navigate('/schedule'),
                        buttonText: 'Кестені ашу',
                        color: 'primary'
                    },
                    {
                        icon: Person,
                        title: 'Профиль',
                        description: 'Жеке мәліметтерді қарау және өзгерту',
                        action: () => navigate('/profile'),
                        buttonText: 'Профильге өту',
                        color: 'secondary'
                    },
                    {
                        icon: BarChart,
                        title: 'Статистика',
                        description: 'Қатысу және үлгерім туралы ақпарат',
                        action: () => alert('Әзірлеу кезеңінде'),
                        buttonText: 'Статистика',
                        color: 'success'
                    }
                ]
            }
        }

        if (user.role === 'teacher') {
            return {
                title: `Сәлем, ${user.name}!`,
                subtitle: `${user.department}`,
                features: [
                    {
                        icon: Calendar3,
                        title: 'Менің сабақтарым',
                        description: 'Сіздің жүргізетін сабақтардың кестесі',
                        action: () => navigate('/schedule'),
                        buttonText: 'Кестені қарау',
                        color: 'primary'
                    },
                    {
                        icon: People,
                        title: 'Топтар',
                        description: 'Сіздің топтарыңыздың тізімі мен мәліметтері',
                        action: () => alert('Әзірлеу кезеңінде'),
                        buttonText: 'Топтар',
                        color: 'success'
                    },
                    {
                        icon: Person,
                        title: 'Профиль',
                        description: 'Жеке мәліметтер және параметрлер',
                        action: () => navigate('/profile'),
                        buttonText: 'Профиль',
                        color: 'secondary'
                    }
                ]
            }
        }

        if (user.role === 'dispatcher') {
            return {
                title: `Сәлем, ${user.name}!`,
                subtitle: `${user.department}`,
                features: [
                    {
                        icon: Upload,
                        title: 'Деректерді жүктеу',
                        description: 'Кесте үшін бастапқы деректерді жүктеңіз',
                        action: () => navigate('/upload'),
                        buttonText: 'Жүктеу',
                        color: 'primary'
                    },
                    {
                        icon: Grid,
                        title: 'Кесте басқару',
                        description: 'Құрылған кестелерді қарау және өңдеу',
                        action: () => navigate('/schedule'),
                        buttonText: 'Кестелер',
                        color: 'success'
                    },
                    {
                        icon: BarChart,
                        title: 'Аналитика',
                        description: 'Кесте статистикасы және есептер',
                        action: () => alert('Әзірлеу кезеңінде'),
                        buttonText: 'Аналитика',
                        color: 'secondary'
                    }
                ]
            }
        }
    }

    const content = getRoleContent()

    return (
        <div className="home-screen">
            {/* Hero Section */}
            <section className="hero-section">
                <Container>
                    <div className="hero-content text-center text-white">
                        <h1 className="display-4 fw-bold mb-3">{content?.title}</h1>
                        <p className="lead">{content?.subtitle}</p>
                    </div>
                </Container>
            </section>

            {/* Features Section */}
            <section className="features-section py-5">
                <Container>
                    <Row className="g-4">
                        {content?.features.map((feature, index) => {
                            const IconComponent = feature.icon
                            return (
                                <Col key={index} xs={12} md={6} lg={4}>
                                    <Card className="feature-card h-100 shadow-sm">
                                        <Card.Body className="d-flex flex-column p-4">
                                            <div className="feature-icon-wrapper mb-3">
                                                <IconComponent size={32} className="feature-icon" />
                                            </div>
                                            <Card.Title className="h5 mb-3 fw-bold">
                                                {feature.title}
                                            </Card.Title>
                                            <Card.Text className="text-muted mb-4 flex-grow-1">
                                                {feature.description}
                                            </Card.Text>
                                            <Button
                                                variant={feature.color}
                                                className="w-100"
                                                onClick={feature.action}
                                            >
                                                {feature.buttonText}
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
            </section>

            {/* Info Section */}
            <section className="info-section py-5 bg-light">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="mb-4 mb-lg-0">
                            <h2 className="mb-4">AI арқылы кесте құру</h2>
                            <p className="lead mb-3">
                                Кесте AI - жасанды интеллект технологиясын пайдаланып, 
                                университет кестесін автоматты түрде құратын заманауи жүйе.
                            </p>
                            <ul className="feature-list">
                                <li>✅ Автоматты кесте құру</li>
                                <li>✅ Қақтығыстарды болдырмау</li>
                                <li>✅ Оңтайлы уақыт бөлу</li>
                                <li>✅ Жылдам өзгерістер енгізу</li>
                            </ul>
                        </Col>
                        <Col lg={6}>
                            <div className="info-image-placeholder bg-primary text-white p-5 rounded text-center">
                                <h3 className="mb-3">📚</h3>
                                <p className="mb-0">Gemini AI моделімен жұмыс істейді</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}