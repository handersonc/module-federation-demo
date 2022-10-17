import React from 'react'
import useAuthentication from 'hooks/use-authentication'


const HomePage = () => {
    const { getSessionToken } = useAuthentication()
    return <>Welcome {getSessionToken()}</>
}

export default HomePage