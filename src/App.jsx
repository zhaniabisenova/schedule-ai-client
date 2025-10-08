import { useState } from 'react'
import {} from './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {AdminHomeScreen, HomeScreen, Login, NotificationsScreen,Profile, Schedule, StatsScreen,UploadScreen } from './screens/index'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/' element={<HomeScreen />} />
          <Route path='/admin' element={<AdminHomeScreen />} />
          <Route path='/notification' element={<NotificationsScreen />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
