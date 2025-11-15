import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router";
import appTheme from "./theme/appTheme";
import { store } from './store/store'
import { Provider } from 'react-redux'

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Outlet />
      </ThemeProvider>
    </Provider>
  );
}
