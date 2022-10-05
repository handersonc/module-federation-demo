import { Typography, TypographyOptions } from "@mui/material/styles/createTypography";

declare module "@mui/material/styles" {
    interface Theme {
        palette: {
            common: {
                main?: string
                gray?: string
                blue?: string
                white?: string
                green?: string
            }
        };
    }

    interface CommonColors {
        main?: string
        gray?: string
        blue?: string
        white?: string
        green?: string
    }

    export default createTheme({ palette });
}