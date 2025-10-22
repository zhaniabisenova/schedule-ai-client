import { useNavigate } from 'react-router-dom'

export const AppNavigator = () => {
    const navigate = useNavigate()
    
    return {
        navigateToLogin: () => navigate('/login'),
        navigateToProfile: () => navigate('/profile'),
        navigateToAdmin: () => navigate('/admin'),
        navigateToHome: () => navigate('/'),
        navigateToSchedule: () => navigate('/schedule'),
        navigateToStats: () => navigate('/stats'),
        navigateToUpload: () => navigate('/upload'),
        navigateToNotifications: () => navigate('/notification')
    }
}