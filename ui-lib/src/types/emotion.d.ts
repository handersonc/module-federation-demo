import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      white: string;
      gray: string;
      red: string;
    };
    space?: string;
    border?: {
      radius: string;
    };
    components: {
      buttons: {},
      inputs: {
        typography: {
          fontFamily: string
        }
      }
    };
  }
}