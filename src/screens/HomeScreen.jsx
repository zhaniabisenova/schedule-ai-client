import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const HomeScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="container-fluid min-vh-100 d-flex flex-column bg-light">
            {/* Navigation Bar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
                <div className="container">
                    <a className="navbar-brand" href="#">AI Университет Кестесі</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-white" onClick={() => navigate("/")}>Басты бет</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-white" onClick={() => navigate("/scheduler")}>Кесте</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-white" onClick={() => navigate("/profile")}>Профиль</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-white" onClick={() => navigate("/admin")}>Админ</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-white" onClick={() => navigate("/login")}>Кіру</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-primary text-white text-center py-5">
                <div className="container">
                    <h1 className="display-3 fw-bold">AI арқылы Университет Кестесін Автоматтандыру</h1>
                    <p className="lead my-4">Сіздің оқу кестеңізді оңтайландыруға және уақытты үнемдеуге арналған инновациялық шешім</p>
                    <button 
                        className="btn btn-warning btn-lg"
                        onClick={() => navigate("/scheduler")}
                    >
                        Бастау
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="container my-5">
                <h2 className="text-center mb-5">Негізгі Мүмкіндіктер</h2>
                <div className="row text-center">
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h3 className="card-title">Ақылды Кесте</h3>
                                <p className="card-text">AI сіздің қажеттіліктеріңізге бейімделген оңтайлы кестелер жасайды.</p>
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => navigate("/scheduler")}
                                >
                                    Кестені зерттеу
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h3 className="card-title">Пайдаланушы Панелі</h3>
                                <p className="card-text">Сабақтарыңызды, мерзімдерді және параметрлерді бір жерде басқарыңыз.</p>
                                <button 
                                    className="btn btn-info"
                                    onClick={() => navigate("/profile")}
                                >
                                    Профильді көру
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h3 className="card-title">Админ Басқару</h3>
                                <p className="card-text">Кестелерді қадағалаңыз, пайдаланушыларды басқарыңыз және AI параметрлерін реттеңіз.</p>
                                <button 
                                    className="btn btn-warning"
                                    onClick={() => navigate("/admin")}
                                >
                                    Админ Панелі
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="bg-secondary text-white py-5">
                <div className="container">
                    <h2 className="text-center mb-4">Біз туралы</h2>
                    <p className="lead text-center">AI Университет Кестесі – бұл оқу процесін жеңілдетуге және тиімділікті арттыруға арналған заманауи платформа. Біздің миссиямыз – білім беру мекемелеріне уақытты басқаруда және кесте құруда көмектесу.</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3 mt-auto">
                <p className="mb-0">© 2025 AI Университет Кестесі. Барлық құқықтар қорғалған.</p>
                <button 
                    className="btn btn-link text-white"
                    onClick={() => navigate("/login")}
                >
                    Кіру
                </button>
            </footer>
        </div>
    );
};