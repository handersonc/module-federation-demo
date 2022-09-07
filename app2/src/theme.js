import { createTheme } from '@mui/material/styles'

const veritextBlue = '#0C79C8'
const veritextSecondary = '#A9D1F8'
const veritextWhite = '#fff'
const veritextGreen = '#57AE86'
const veritextGray = '#808080'
const yellow = '#ffdb00'

export default createTheme({
  palette: {
    common: {
      blue: veritextBlue,
      gray: veritextGray,
      white: veritextWhite,
      green: veritextGreen,
      yellow: yellow
    },
    primary: {
      main: veritextBlue
    },
    secondary: {
      main: veritextSecondary
    },
    white: {
      main: veritextWhite
    }
  },
  typography: {
    tab: {
      fontFamily: 'Raleway',
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '1rem'
    },
  }
})
