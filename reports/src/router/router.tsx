import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from 'pages/home'

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='/' element={<HomePage />} />
    </Routes>
  )
};

export default AppRouter
