import { Box } from "@mui/material";
import { Outlet } from "react-router";
import Footer from "~/components/footer";
import NavBar from "~/components/navBar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { LOCALSTORAGE_TOKEN_KEY } from "../consts";
import { getUser } from "../store/userSlice";
import { useEffect } from "react";

export default function MainLayout() {
    const appDispatch = useAppDispatch();

    useEffect(() => {
        const authToken = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
        if (authToken) {
            appDispatch(getUser(authToken));
        }
    }, [appDispatch])

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            <Box sx={{ flex: 1 }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
}


