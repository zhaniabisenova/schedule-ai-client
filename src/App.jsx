/**
 * Басқа компонент - бұл біздің React қолданбасымыздың негізі
 * Мұнда барлық беттердің жолдарын (routes) анықтаймыз
 * 
 * Қысқасы: бұл файл қолданбаның "қақпасы" - барлық беттер осы жерден басталады
 */

// React Router - беттер арасында өту үшін қажет
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Біздің custom hook - пайдаланушының кіруі мен шығуы үшін
import { AuthProvider } from './hooks/useAuth'

// Layout компоненті - барлық беттерде бірдей көрінетін меню
import { AppLayout } from './components/layout/AppLayout'

// Барлық беттердің компоненттері
import { HomeScreen, Login, Profile, Schedule, UploadScreen, NotificationsScreen, AdminHomeScreen, ReferencesManagement, ExcelImport } from './screens/index'

// Диспетчер үшін арнайы беттер
import DispatcherDashboard from './screens/DispatcherDashboard'
import ScheduleEditor from './screens/ScheduleEditor'
import PenaltySettings from './screens/PenaltySettings'

// Қорғалған беттер үшін компонент (кірмеген пайдаланушылар кіре алмайды)
import { ProtectedRoute } from './components/auth/ProtectedRoute'

// Bootstrap стильдері
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  return (
    // AuthProvider - барлық қолданбада пайдаланушы деректерін қол жетімді етеді
    <AuthProvider>
      {/* Router - беттер арасында өтуді іске қосады */}
      <Router>
        {/* AppLayout - барлық беттерде бірдей меню мен дизайн */}
        <AppLayout>
          {/* Routes - барлық беттердің жолдары */}
          <Routes>
            {/* Кіру беті - барлық адам кіре алады */}
            <Route path='/login' element={<Login />} />
            
            {/* Басты бет - кіруі қажет */}
            <Route 
              path='/' 
              element={
                <ProtectedRoute>
                  <HomeScreen />
                </ProtectedRoute>
              } 
            />
            
            {/* Профиль беті - кіруі қажет */}
            <Route 
              path='/profile' 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            
            {/* Кесте беті - кіруі қажет */}
            <Route 
              path='/schedule' 
              element={
                <ProtectedRoute>
                  <Schedule />
                </ProtectedRoute>
              } 
            />
            
            {/* Деректерді жүктеу беті - тек диспетчер кіре алады */}
            <Route 
              path='/upload' 
              element={
                <ProtectedRoute allowedRoles={['dispatcher']}>
                  <UploadScreen />
                </ProtectedRoute>
              } 
            />
            
            {/* Хабарландырулар беті - кіруі қажет */}
            <Route 
              path='/notifications' 
              element={
                <ProtectedRoute>
                  <NotificationsScreen />
                </ProtectedRoute>
              } 
            />
            
            {/* Админ беті - тек админ кіре алады */}
            <Route 
              path='/admin' 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminHomeScreen />
                </ProtectedRoute>
              } 
            />
            
            {/* Диспетчер панелі - диспетчер мен админ кіре алады */}
            <Route 
              path='/dispatcher' 
              element={
                <ProtectedRoute allowedRoles={['dispatcher', 'admin']}>
                  <DispatcherDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Анықтамалықтарды басқару - диспетчер мен админ кіре алады */}
            <Route 
              path='/references' 
              element={
                <ProtectedRoute allowedRoles={['dispatcher', 'admin']}>
                  <ReferencesManagement />
                </ProtectedRoute>
              } 
            />
            
            {/* Excel импорт - диспетчер мен админ кіре алады */}
            <Route 
              path='/import' 
              element={
                <ProtectedRoute allowedRoles={['dispatcher', 'admin']}>
                  <ExcelImport />
                </ProtectedRoute>
              } 
            />
            
            {/* Кесте редакторы - диспетчер мен админ кіре алады */}
            <Route 
              path='/dispatcher/schedule/:scheduleId' 
              element={
                <ProtectedRoute allowedRoles={['dispatcher', 'admin']}>
                  <ScheduleEditor />
                </ProtectedRoute>
              } 
            />
            
            {/* Айыппұл баптаулары - диспетчер мен админ кіре алады */}
            <Route 
              path='/dispatcher/penalty-settings' 
              element={
                <ProtectedRoute allowedRoles={['dispatcher', 'admin']}>
                  <PenaltySettings />
                </ProtectedRoute>
              } 
            />
            
            {/* Басқа жолдардың барлығы басты бетке бағытталады */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
  )
}
