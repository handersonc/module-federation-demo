import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from 'pages/Home'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<HomePage />} />
    </Routes>
  )
}

export default AppRouter