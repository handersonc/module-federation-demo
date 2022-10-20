import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from 'pages/home'
const ReportsApp = React.lazy(() => import('reports/app'))


const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={
        <Suspense fallback="Loading">
          <HomePage />
        </Suspense>} />

      <Route path='/reports/*' element={
        <Suspense fallback={'Loading'}>
          <ReportsApp />
        </Suspense>} />
    </Routes>
  )
}

export default AppRouter
