import React from 'react'
import AppRouter from 'router/router'

import MainLayout from 'components/layouts/main-layout/main-layout'
import { theme } from 'themes/default'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'

const RootContainer = () => {
  return (<ThemeProvider theme={theme}>
    <BrowserRouter>
      <MainLayout>
        <AppRouter />
      </MainLayout>
    </BrowserRouter>
  </ThemeProvider>)
}
export default RootContainer