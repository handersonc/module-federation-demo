import React from 'react'
import useAuthentication from 'host/use-authentication'

const Header = () => {
    const { getSessionToken } = useAuthentication()
    const token = getSessionToken()
    return <>Header 2 from app1 {token ? token : 'No session'}</>
}

export default Header