import React from 'react'
import useAuthentication from 'hooks/use-authentication'
import { Button } from 'alms-sumadi-ui-lib';

const HomePage = () => {
    const { getSessionToken } = useAuthentication()
    return <>
        Welcome from reports {getSessionToken()}
        <Button title='Hello  World' />
    </>
}

export default HomePage