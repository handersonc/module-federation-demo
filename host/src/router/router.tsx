import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from 'pages/home'
const ReportsApp = React.lazy(() => import('reports/app'))


const AppRouter = () => {
  return (
    <React.Suspense fallback="Loading">
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/reports/*' element={<ReportsApp />} />
        <Route path='*' element={<Navigate to='/home' />} />
      </Routes>
    </React.Suspense>
  )
}

export default AppRouter
