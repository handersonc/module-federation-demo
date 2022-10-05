import React from 'react'
import AppRouter from 'router/router'
import MainLayout from 'components/layouts/main-layout/main-layout'
import { BrowserRouter } from 'react-router-dom'

const RootContainer = () => {
  return (<BrowserRouter>
    <MainLayout>
      <AppRouter />
    </MainLayout>
  </BrowserRouter>
  )
}
export default RootContainer