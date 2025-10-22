import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
    persist(
        (set, get) => ({
            // Состояние пользователя
            user: null,
            isAuthenticated: false,
            
            // Состояние расписания
            schedule: [],
            selectedDay: 'monday',
            
            // Состояние уведомлений
            notifications: [],
            
            // Состояние загрузки
            isLoading: false,
            
            // Действия для пользователя
            setUser: (user) => set({ user, isAuthenticated: !!user }),
            logout: () => set({ user: null, isAuthenticated: false }),
            
            // Действия для расписания
            setSchedule: (schedule) => set({ schedule }),
            addLesson: (lesson) => set((state) => ({ 
                schedule: [...state.schedule, lesson] 
            })),
            updateLesson: (id, updatedLesson) => set((state) => ({
                schedule: state.schedule.map(lesson => 
                    lesson.id === id ? { ...lesson, ...updatedLesson } : lesson
                )
            })),
            deleteLesson: (id) => set((state) => ({
                schedule: state.schedule.filter(lesson => lesson.id !== id)
            })),
            setSelectedDay: (day) => set({ selectedDay: day }),
            
            // Действия для уведомлений
            addNotification: (notification) => set((state) => ({
                notifications: [...state.notifications, {
                    id: Date.now(),
                    ...notification,
                    timestamp: new Date().toISOString()
                }]
            })),
            removeNotification: (id) => set((state) => ({
                notifications: state.notifications.filter(n => n.id !== id)
            })),
            clearNotifications: () => set({ notifications: [] }),
            
            // Действия для загрузки
            setLoading: (isLoading) => set({ isLoading }),
            
            // Геттеры
            getLessonsByDay: (day) => {
                const { schedule } = get()
                return schedule.filter(lesson => lesson.day === day)
            },
            
            getLessonsByTime: (time) => {
                const { schedule } = get()
                return schedule.filter(lesson => lesson.time === time)
            },
            
            getUnreadNotifications: () => {
                const { notifications } = get()
                return notifications.filter(n => !n.read)
            }
        }),
        {
            name: 'schedule-ai-store',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                schedule: state.schedule,
                selectedDay: state.selectedDay
            })
        }
    )
)
