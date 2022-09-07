import axios from 'axios'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

import {LOGIN_SESSION_KEY,  LOGIN_TIMESTAMP_KEY, LOGIN_TOKEN_KEY, USER_ID_KEY} from 'constants/localStorageKeys'

function useAuthentication () {
  async function authenticate (username, password, persistLogin) {
    if (!username) {
      throw new Error('Username is required to authenticate')
    }
    if (!password) {
      throw new Error('Password is required to authenticate')
    }

    const dummyCrendentialEnabled = APP_CONFIG.dummyCredentials

    if (dummyCrendentialEnabled) {
      username = APP_CONFIG.dummyCredentials.username
      password = APP_CONFIG.dummyCredentials.password
    }

    const fingerprinter = await FingerprintJS.load()
    const fingerprint = await fingerprinter.get()

    const { data: loginResult } = await axios({
      method: 'POST',
      url: `${APP_CONFIG.gds.host}/login`,
      data: {
        application: `${APP_NAME}@${APP_VERSION}`,
        device: {
          description: window.navigator.userAgent,
          id: fingerprint.visitorId,
          type: window.navigator.oscpu || window.navigator.platform
        },
        password,
        username
      }
    })

    localStorage.setItem(LOGIN_SESSION_KEY, loginResult.session)
    localStorage.setItem(LOGIN_TIMESTAMP_KEY, Date.now())
    localStorage.setItem(
      USER_ID_KEY,
      loginResult.user && loginResult.user.userId
    )
    localStorage.setItem('userInfo', JSON.stringify(loginResult.user))

    if (persistLogin) {
      localStorage.setItem(LOGIN_TOKEN_KEY, loginResult.token)
    }

    return loginResult
  }

  function getSessionToken () {
    return localStorage.getItem(LOGIN_SESSION_KEY)
  }

  function getUserId () {
    return +localStorage.getItem(USER_ID_KEY)
  }

  function isLoggedIn () {
    let loggedIn = false

    const lastLoginTimestamp = localStorage.getItem(LOGIN_TIMESTAMP_KEY)
    const sessionToken =
      window.__INITIAL__DATA__.bearerToken ||
      APP_CONFIG.gds.defaultBearerToken ||
      localStorage.getItem(LOGIN_SESSION_KEY)

    if (sessionToken) {
      //TODO(pbaio) Get this into the config and possibly increase the timeout
      lastLoginTimestamp
        ? (loggedIn = Date.now() - lastLoginTimestamp < 3600000)
        : (loggedIn = true)
    }
   
    return loggedIn
  }

  function logout () {
    localStorage.clear()
  }

  return {
    authenticate,
    getSessionToken,
    getUserId,
    isLoggedIn,
    logout
  }
}

export default useAuthentication
