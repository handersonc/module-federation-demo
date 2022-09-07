import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from 'pages/Login'
import HomePage from 'pages/Home'

const AppRouter = () => {
  return (
    <>
      <BrowserRouter basename={APP_CONFIG.virtualDirPath}>
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRouter
