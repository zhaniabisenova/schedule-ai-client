// Моковые данные для разработки
export const mockUsers = [
    {
        id: 1,
        email: 'student@university.kz',
        name: 'Айдар Студент',
        role: 'student',
        group: 'Группа А',
        faculty: 'Информационные технологии'
    },
    {
        id: 2,
        email: 'teacher@university.kz',
        name: 'Профессор Иванов',
        role: 'teacher',
        department: 'Кафедра математики',
        subjects: ['Математика', 'Алгебра']
    },
    {
        id: 3,
        email: 'admin@university.kz',
        name: 'Администратор',
        role: 'admin'
    }
]

export const mockSchedule = [
    {
        id: 1,
        subject: 'Математика',
        teacher: 'Иванов И.И.',
        room: '101',
        time: '09:30',
        type: 'lecture',
        group: 'Группа А',
        day: 'monday',
        duration: 90,
        description: 'Основы математического анализа'
    },
    {
        id: 2,
        subject: 'Физика',
        teacher: 'Петров П.П.',
        room: '205',
        time: '11:00',
        type: 'practical',
        group: 'Группа А',
        day: 'monday',
        duration: 90,
        description: 'Лабораторная работа по механике'
    },
    {
        id: 3,
        subject: 'Программирование',
        teacher: 'Сидоров С.С.',
        room: '301',
        time: '14:00',
        type: 'lab',
        group: 'Группа А',
        day: 'tuesday',
        duration: 90,
        description: 'Практическое программирование на JavaScript'
    },
    {
        id: 4,
        subject: 'Английский язык',
        teacher: 'Козлова К.К.',
        room: '102',
        time: '08:00',
        type: 'practical',
        group: 'Группа А',
        day: 'wednesday',
        duration: 90,
        description: 'Разговорная практика'
    },
    {
        id: 5,
        subject: 'История Казахстана',
        teacher: 'Нурсултан Н.Н.',
        room: '203',
        time: '12:30',
        type: 'lecture',
        group: 'Группа А',
        day: 'wednesday',
        duration: 90,
        description: 'Культурное наследие Казахстана'
    },
    {
        id: 6,
        subject: 'Базы данных',
        teacher: 'Алматов А.А.',
        room: '302',
        time: '15:30',
        type: 'lab',
        group: 'Группа А',
        day: 'thursday',
        duration: 90,
        description: 'Работа с SQL базами данных'
    },
    {
        id: 7,
        subject: 'Экзамен по математике',
        teacher: 'Иванов И.И.',
        room: '101',
        time: '09:30',
        type: 'exam',
        group: 'Группа А',
        day: 'friday',
        duration: 120,
        description: 'Итоговый экзамен по математическому анализу'
    }
]

export const mockNotifications = [
    {
        id: 1,
        title: 'Новое расписание',
        message: 'Расписание на следующую неделю обновлено',
        type: 'info',
        read: false,
        timestamp: '2025-01-15T10:00:00Z'
    },
    {
        id: 2,
        title: 'Изменение аудитории',
        message: 'Занятие по программированию перенесено в аудиторию 305',
        type: 'warning',
        read: false,
        timestamp: '2025-01-15T09:30:00Z'
    },
    {
        id: 3,
        title: 'Экзамен',
        message: 'Напоминание: завтра экзамен по математике в 09:30',
        type: 'warning',
        read: true,
        timestamp: '2025-01-14T18:00:00Z'
    }
]

export const mockStats = {
    totalLessons: 7,
    completedLessons: 5,
    upcomingLessons: 2,
    averageAttendance: 85,
    favoriteSubject: 'Программирование',
    weeklyHours: 15,
    monthlyHours: 60
}
