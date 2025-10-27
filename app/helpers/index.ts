import { createTheme, type Theme, type ThemeOptions } from "@mui/material"
import { deepmerge } from '@mui/utils';

export const mergeWithOuterTheme = (newThemeOptions: ThemeOptions) => {
    return (outerTheme: Theme) => createTheme(deepmerge(outerTheme, newThemeOptions))
}