import React from 'react'
import AppRouter from 'router/router'
import { BrowserRouter } from 'react-router-dom'

import MainLayout from 'components/layouts/main-layout/main-layout'
import { theme } from 'themes/default'
import { ThemeProvider } from '@emotion/react'

const RootContainer = () => {
  return (<ThemeProvider theme={theme}>
    <BrowserRouter basename="/reports">
      <MainLayout>
        <AppRouter />
      </MainLayout>
    </BrowserRouter>
  </ThemeProvider>
  )
}
export default RootContainer