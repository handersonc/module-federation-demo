import React, { useState } from 'react'
import useAuthentication from 'hooks/useAuthentication'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const { authenticate } = useAuthentication()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameFocus, setUsernameFocus] = useState(true)
  const [passwordFocus, setPasswordFocus] = useState(false)
  const navigate = useNavigate()

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
      try {
        const result = await authenticate(username, password)
        if (result) {
          // navigate('/')
          window.location.href = '/'
        }
      } catch (e) {
        console.dir('ERROR: ', e)
        alert('Something went wrong, please re-enter credentials and try again.', true)
      }
    } else {
      alert('Username and Password are Required to Login', true)
    }
  }

  return <>
    <form onSubmit={handleSubmit} key='form'>
        <input key='username' type="text" onChange={handleUsername} autoFocus={usernameFocus} value={username} />
        <input key='password' type='password' onChange={handlePassword} autoFocus={passwordFocus} value={password} />
        <input type="submit" />
    </form>
  </>
}

export default LoginForm
