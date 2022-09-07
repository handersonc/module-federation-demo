import React from 'react';
import { createRoot } from 'react-dom/client'
import RootContainer from 'containers/Root'

const rootContainer = document.getElementById('root')
const root = createRoot(rootContainer)
root.render(<RootContainer />)