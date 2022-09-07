import React, { useState } from 'react'

import ClipLoader from 'react-spinners/ClipLoader'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Box, Divider } from '@mui/material'

import { useTheme } from '@mui/material/styles'
import styled from '@emotion/styled'

import logo from 'assets/veritext_logo_reverse.png'

import useAuthentication from 'hooks/useAuthentication'
import useSnackbar from 'hooks/useSnackbar'

const Login = ({ callback }) => {
  const { authenticate } = useAuthentication()
  const theme = useTheme()
  const { openSnackbar } = useSnackbar()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [usernameFocus, setUsernameFocus] = useState(true)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const handleUsername = e => {
    setUsername(e.target.value)
    setUsernameFocus(true)
    setPasswordFocus(false)
  }

  const handlePassword = e => {
    setPassword(e.target.value)
    setUsernameFocus(false)
    setPasswordFocus(true)
  }

  async function handleSubmit (e) {
    e.preventDefault()

    if (username && password) {
      setLoading(true)
      try {
        await authenticate(username, password)
        callback()
      } catch (e) {
        // console.dir('ERROR: ', e)
        openSnackbar('Something went wrong, please re-enter credentials and try again.', true)
      }
    } else {
      openSnackbar('Username and Password are Required to Login', true)
    }
    setLoading(false)
  }

  const StyledButton = styled(Button)({
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    '.MuiButton-root': {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2)
    },
    color: theme.palette.common.blue,
    transition: 'background-color 0.5s ease',
    backgroundColor: theme.palette.common.white,
    borderRadius: '20px',
    ':hover': {
      backgroundColor: theme.palette.common.white
    }
  })

  const StyledTypography = styled(Typography)({
    color: theme.palette.common.white,
    flexBasis: '70%',
    fontWeight: 500,
    textAlign: 'center'
  })

  const DecorativeWelcomeTextContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(4)
  })

  const StyledPaper = styled(Paper)({
    alignContent: 'stretch',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'auto',
    position: 'relative',
    [theme.breakpoints.only('md')]: {
      left: 'inherit'
    },
    [theme.breakpoints.only('sm')]: {
      width: '100%',
      height: '100%'
    },
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.palette.common.blue,
    width: '30%'
  })

  const DecorativeWelcomeText = (
    <DecorativeWelcomeTextContainer>
      <StyledTypography variant='h5'>Workflow Task Manager</StyledTypography>
    </DecorativeWelcomeTextContainer>
  )

  const StyledTextField = styled(TextField)({
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    fieldset: {
      borderRadius: '10px'
    },
    input: {
      color: theme.palette.common.white
    },
    '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.white
    }
  })

  return (
    <Box
      style={{
        backgroundColor: theme.palette.common.blue
      }}
    >
      <Box
        container
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          position: 'absolute',
          width: '100%',
          justifyContent: 'space-evenly',
          backgroundColor: theme.palette.common.blue
        }}
      >
        <StyledPaper square elevation={0}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <img width={150} height={60} src={logo} />
          </Box>
          {DecorativeWelcomeText}
          <Divider
            style={{
              color: theme.palette.common.white
            }}
          >
            Sign in with username and password
          </Divider>
          <Grid justifyContent='center'>
            <form onSubmit={handleSubmit} key='form'>
              <Grid item>
                <StyledTextField
                  color='primary'
                  onChange={handleUsername}
                  required
                  value={username}
                  variant='outlined'
                  autoFocus={usernameFocus}
                  fullWidth
                  size='small'
                  placeholder='username'
                  key='username'
                />
              </Grid>
              <Grid item>
                <StyledTextField
                  onChange={handlePassword}
                  required
                  type='password'
                  value={password}
                  variant='outlined'
                  autoFocus={passwordFocus}
                  autoComplete='current-password'
                  size='small'
                  fullWidth
                  placeholder='password'
                  key='password'
                />
              </Grid>
              <Grid item>
                <StyledButton
                  fullWidth
                  size='small'
                  type='submit'
                  variant='outlined'
                >
                  <Typography variant='button'>Login</Typography>
                  <ClipLoader
                    color={'inherit'}
                    css={'margin-left: 10px'}
                    loading={loading}
                    size={20}
                  />
                </StyledButton>
              </Grid>
            </form>
          </Grid>
        </StyledPaper>
      </Box>
    </Box>
  )
}

export default Login
