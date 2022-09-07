import React from 'react'
import { createRoot } from 'react-dom/client'

import RootContainer from './containers/Root'
import * as Sentry from '@sentry/browser'
import { BrowserTracing } from '@sentry/tracing'

Sentry.init({
  dsn:
    'https://3055f3fe28f546f88fa669f586166c5c@o325141.ingest.sentry.io/6258630',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: APP_CONFIG.sentry.tracesSampleRate || 0.2
})
const rootContainer = document.getElementById('root')
const root = createRoot(rootContainer)
root.render(<RootContainer />)
