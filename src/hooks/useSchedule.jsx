import { useState, useEffect } from 'react'

export const useSchedule = () => {
    const [schedule, setSchedule] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    // Загрузка расписания
    const fetchSchedule = async (params = {}) => {
        setIsLoading(true)
        setError(null)
        
        try {
            // Здесь будет API вызов
            // Пока используем моковые данные
            const mockSchedule = [
                {
                    id: 1,
                    subject: 'Математика',
                    teacher: 'Иванов И.И.',
                    room: '101',
                    time: '09:30',
                    type: 'lecture',
                    group: 'Группа А',
                    day: 'monday'
                },
                {
                    id: 2,
                    subject: 'Физика',
                    teacher: 'Петров П.П.',
                    room: '205',
                    time: '11:00',
                    type: 'practical',
                    group: 'Группа А',
                    day: 'monday'
                },
                {
                    id: 3,
                    subject: 'Программирование',
                    teacher: 'Сидоров С.С.',
                    room: '301',
                    time: '14:00',
                    type: 'lab',
                    group: 'Группа А',
                    day: 'tuesday'
                }
            ]
            
            setSchedule(mockSchedule)
            return { success: true, data: mockSchedule }
        } catch (err) {
            setError(err.message)
            return { success: false, error: err.message }
        } finally {
            setIsLoading(false)
        }
    }

    // Добавление занятия
    const addLesson = async (lessonData) => {
        try {
            const newLesson = {
                id: Date.now(),
                ...lessonData
            }
            setSchedule(prev => [...prev, newLesson])
            return { success: true, data: newLesson }
        } catch (err) {
            setError(err.message)
            return { success: false, error: err.message }
        }
    }

    // Обновление занятия
    const updateLesson = async (id, lessonData) => {
        try {
            setSchedule(prev => 
                prev.map(lesson => 
                    lesson.id === id ? { ...lesson, ...lessonData } : lesson
                )
            )
            return { success: true }
        } catch (err) {
            setError(err.message)
            return { success: false, error: err.message }
        }
    }

    // Удаление занятия
    const deleteLesson = async (id) => {
        try {
            setSchedule(prev => prev.filter(lesson => lesson.id !== id))
            return { success: true }
        } catch (err) {
            setError(err.message)
            return { success: false, error: err.message }
        }
    }

    // Получение занятий по дню
    const getLessonsByDay = (day) => {
        return schedule.filter(lesson => lesson.day === day)
    }

    // Получение занятий по времени
    const getLessonsByTime = (time) => {
        return schedule.filter(lesson => lesson.time === time)
    }

    useEffect(() => {
        fetchSchedule()
    }, [])

    return {
        schedule,
        isLoading,
        error,
        fetchSchedule,
        addLesson,
        updateLesson,
        deleteLesson,
        getLessonsByDay,
        getLessonsByTime
    }
}
