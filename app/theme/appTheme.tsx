import { alpha, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { deDE } from "@mui/material/locale";
import { brand, gray, orange, red, green } from "./colors";

const theme = createTheme({
    shape: {
        borderRadius: 8
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    light: brand[200],
                    main: brand[400],
                    dark: brand[700],
                    contrastText: brand[50],
                },
                info: {
                    light: brand[100],
                    main: brand[300],
                    dark: brand[600],
                    contrastText: gray[50],
                },
                warning: {
                    light: orange[300],
                    main: orange[400],
                    dark: orange[800],
                },
                error: {
                    light: red[300],
                    main: red[400],
                    dark: red[800],
                },
                success: {
                    light: green[300],
                    main: green[400],
                    dark: green[800],
                },
                grey: {
                    ...gray,
                },
                divider: alpha(gray[300], 0.4),
                background: {
                    default: 'hsl(0, 0%, 99%)',
                    paper: 'hsl(220, 35%, 97%)',
                },
                text: {
                    primary: gray[800],
                    secondary: gray[600],
                },
                action: {
                    hover: alpha(gray[200], 0.2),
                    selected: `${alpha(gray[200], 0.3)}`,
                },
            },
        },
    }
}, deDE)

export default theme;