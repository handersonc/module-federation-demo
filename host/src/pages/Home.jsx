import React from 'react'
import useAuthentication from 'hooks/useAuthentication'

const HomePage = () => {
    const { getSessionToken } = useAuthentication()
    return <>Welcome {getSessionToken()}</>
}

export default HomePage