import { createTheme, type Theme, type ThemeOptions } from "@mui/material"
import { deepmerge } from '@mui/utils';
import { LOCALSTORAGE_TOKEN_KEY } from "~/consts";

export const mergeWithOuterTheme = (newThemeOptions: ThemeOptions) => {
    return (outerTheme: Theme) => createTheme(deepmerge(outerTheme, newThemeOptions))
}

export const priceFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

export const formatPriceInCents = (priceInCents: number): string => {
    return priceFormatter.format(priceInCents / 100);
}

export const getToken = () => {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    if (!token) {
        throw new Error("Kein Token gefunden");
    }
    return token;
}