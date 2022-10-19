
//.storybook/preview.js
import('../src/assets/styles/bootstrap.css');
import('../src/assets/styles/sumadi.css');
import('../src/assets/styles/dev_updates.css');

import React from 'react';
import { ThemeProvider } from '@emotion/react'
import { theme } from 'themes/default'
import { BrowserRouter } from 'react-router-dom';


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    // opt-out of inline rendering
    inlineStories: false,
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
  (Story) => (
    <div className='sumadi'>
      <BrowserRouter>
        <Story />
      </BrowserRouter>      
    </div>
  ),
];