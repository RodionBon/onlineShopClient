import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router";
import appTheme from "./theme/appTheme";

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}


