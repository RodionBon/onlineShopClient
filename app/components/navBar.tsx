import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container, createTheme, IconButton, ThemeProvider } from '@mui/material';
import { deDE } from '@mui/material/locale';
import { useState } from 'react';
import AppDrawer from './appDrawer';
import { Link } from 'react-router';

const navBarTheme = createTheme({
    components: {
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fontSize: 48,
                }
            }
        }
    }
}, deDE);


function NavBar() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <>
            <AppDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            <ThemeProvider theme={navBarTheme}>
                <Box sx={{ paddingY: 2, backgroundColor: 'primary.main' }}>
                    <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <IconButton onClick={() => setIsDrawerOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Box>
                            <IconButton component={Link} to="/shoppingCart">
                                <ShoppingCartIcon />
                            </IconButton>
                            <IconButton component={Link} to="/account">
                                <PersonIcon />
                            </IconButton>
                        </Box>
                    </Container>
                </Box>
            </ThemeProvider >
        </>
    )
}

export default NavBar;