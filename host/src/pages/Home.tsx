import React from 'react'
import useAuthentication from 'hooks/use-authentication'
import DemoFederatedComponent from 'reports/demo';



const HomePage = () => {
    const { getSessionToken } = useAuthentication()
    return <>Welcome {getSessionToken()} <DemoFederatedComponent /></>
}

export default HomePage