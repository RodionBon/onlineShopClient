import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Container, IconButton, styled, ThemeProvider, Toolbar, type ThemeOptions } from '@mui/material';
import { useState } from 'react';
import AppDrawer from './appDrawer';
import { Link } from 'react-router';
import { mergeWithOuterTheme } from '~/helpers';

const navBarThemeOptions: ThemeOptions = {
    components: {
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fontSize: 36,
                }
            }
        }
    }
};

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    boxShadow: (theme.vars || theme).shadows[1],
    border: '1px solid',
    borderRadius: `calc(${theme.shape.borderRadius}px + 16px)`,
    borderColor: 'theme.palette.divider',
    backgroundColor: "#fff",
}))

function NavBar() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <>
            <AppDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            <ThemeProvider theme={mergeWithOuterTheme(navBarThemeOptions)}>
                <AppBar position='static' sx={{ paddingY: 1, backgroundColor: 'transparent', boxShadow: 'none' }}>
                    <Container>
                        <StyledToolbar>
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
                        </StyledToolbar>
                    </Container>
                </AppBar>
            </ThemeProvider >
        </>
    )
}

export default NavBar;