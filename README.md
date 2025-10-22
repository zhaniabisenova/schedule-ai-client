# Кесте AI - Клиент

Университет кестесін басқару жүйесінің клиенттік бөлігі.

## 🚀 Орнату

```bash
npm install
```

## 💻 Жұмыс істету

```bash
npm run dev
```

Браузерде ашу: `http://localhost:5173`

## 🔐 Тестілеу үшін аккаунттар

### Студент
- Email: `student@university.kz`
- Құпия сөз: `student123`

### Оқытушы
- Email: `teacher@university.kz`
- Құпия сөз: `teacher123`

### Диспетчер
- Email: `dispatcher@university.kz`
- Құпия сөз: `dispatcher123`

## 📱 Адаптивтілік

- **Десктоп**: Меню жоғарыда (навигация бар)
- **Мобильді**: Меню төменде (навигация батырмалары)

## 🎯 Мүмкіндіктер

- ✅ Рөлге негізделген авторизация (студент, оқытушы, диспетчер)
- ✅ Адаптивті дизайн (десктоп және мобильді)
- ✅ Профильді басқару
- ✅ Кесте көрсету
- 🔄 Gemini AI интеграциясы (әзірлеу кезеңінде)

## 🛠 Технологиялар

- React 19.1.1
- Vite 7.1.7
- React Bootstrap 2.10.10
- React Router DOM 7.9.3
- Zustand 4.4.7 (state management)

## 📁 Құрылым

```
src/
├── components/        # Қайта пайдаланылатын компоненттер
│   ├── layout/       # Layout компоненттері (Desktop/Mobile Nav)
│   ├── auth/         # Аутентификация компоненттері
│   ├── ui/           # UI компоненттері (Button, Input, Loader)
│   └── shedule/      # Кесте компоненттері
├── screens/          # Беттер (Home, Login, Profile, Schedule)
├── hooks/            # Custom hooks (useAuth, useSchedule)
├── services/         # API қызметтер және mock data
├── store/            # State management (Zustand)
└── utils/            # Утилиталар және константалар
```

## 🔧 Команды

```bash
npm run dev      # Әзірлеу режимі
npm run build    # Продакшн үшін құрастыру
npm run preview  # Құрастырылған нұсқаны қарау
npm run lint     # Код тексеру
```

## 📝 Ескертпе

Бұл жоба университет кестесін AI арқылы автоматты түрде құруға арналған. 
Gemini API пайдаланып, оңтайлы кесте құрылады.
