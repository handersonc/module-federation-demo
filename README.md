# Microfrontends with Module Federation

## Stack
  - react 18
  - react-router-dom v6
  - Storybook for ui-lib library
  - Typescript
  - Rollup bundler for ui-lib library
  - webpack bundler for host and reports app

## Spinning up the projects in localhost
  1. `cd ui-lib`
  2. `npm i`
  3. `npm run build`
  4. `npm link`
  5. `cd ..`
  6. `cd reports`
  7. `npm i`
  8. `npm link alms-sumadi-ui-lib`
  9. `npm start` > will open the app reports microfrontend in localhost:4001 then you have to enter to the browser in localhost:4001/reports
    Note: commands from 1 to 9 should be executed in the same terminal
  10. `cd ..`
  11. `cd host`
  12. `npm i`
  13. `npm start` > will open the app host microfrontend in localhost:4000, then you have to enter to the browser in localhost:4000, in here you will see the sidebar with options to see reports microfrontend embebed with Module Federation in action.

