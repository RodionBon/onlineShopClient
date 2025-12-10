import { Box } from "@mui/material";
import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Box sx={{ width: { xs: '75%', md: '50%', lg: '33%' } }}>
                <Outlet />
            </Box>
        </Box>
    );
}


