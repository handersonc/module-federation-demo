import React from 'react'
import useAuthentication from 'host/useAuthentication'

const Header = () => {
    const { getSessionToken } = useAuthentication()
    const token = getSessionToken()
    return <>Header {token ? token : 'No session'}</>
}

export default Header