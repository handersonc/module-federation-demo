import 'assets/styles/bootstrap.css'
import 'assets/styles/sumadi.css'
import 'assets/styles/dev_updates.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'assets/styles/sumadi-faculty.css'

import { createRoot } from 'react-dom/client'
import RootContainer from 'components/containers/root'
import { ThemeProvider } from '@emotion/react';
import { theme } from 'themes/default'

const rootContainer = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(rootContainer!)
root.render(<ThemeProvider theme={theme}><RootContainer /></ThemeProvider>)
