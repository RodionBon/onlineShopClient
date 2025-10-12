import { createTheme, CssBaseline, TextField, ThemeProvider } from "@mui/material";
import { deDE } from "@mui/material/locale";
import { Outlet } from "react-router";
import ProductListPage from "./pages/productListPage";

const theme = createTheme(deDE)

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}


