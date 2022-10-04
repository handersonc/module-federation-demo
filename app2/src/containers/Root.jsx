import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'

import useAuthentication from 'hooks/use-authentication'

import AppRouter from 'containers/AppRouter'
import Snackbar from 'containers/Snackbar'

import GDSApollo from 'containers/GDSApollo'
import theme from 'theme'

const RootContainer = () => {
  return (
    <>Hola 2</>
  )
}
export default RootContainer
