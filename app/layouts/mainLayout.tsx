import { Box } from "@mui/material";
import { Outlet } from "react-router";
import Footer from "~/components/footer";
import NavBar from "~/components/navBar";

export default function MainLayout() {
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


