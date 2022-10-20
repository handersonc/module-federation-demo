# SUMADI-UI-LIB

UI library

## StoryBook

```
npm run storybook
```

Every component should be created into components folder and should be have <component>.stories.tsx file
where the different variations should described using storybook sintaxys. Check the folowing link to read more about sotrybook

https://storybook.js.org/

## Build

```
npm run build
```

## Using the library in other apps

In local development you can use `npm link`:
  1. inside the lib directory run `npm link`
  2. cd appdirectory
  3. npm link alms-sumadi-ui-lib
  4. npm i alms-sumadi-ui-lib or add the dependency in the package.json
  5. Run the app: In this example repository the reports folder contains the reports react app which is sppining up doing `npm start`





