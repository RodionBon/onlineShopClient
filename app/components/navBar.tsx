import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, AppBar, Box, Container, IconButton, styled, ThemeProvider, Toolbar, type ThemeOptions } from '@mui/material';
import { useState } from 'react';
import AppDrawer from './appDrawer';
import { Link } from 'react-router';
import { mergeWithOuterTheme } from '~/helpers';
import { useAppSelector } from '~/store/hooks';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from '~/store/hooks';
import { signOut } from '~/store/userSlice';
import { LOCALSTORAGE_TOKEN_KEY } from '~/consts';

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
    const appDispatch = useAppDispatch();
    
    const user = useAppSelector(state => state.user);
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);


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
                                {user.isLoading && token || user.userData ? (
                                    <>
                                        <IconButton component={Link} to="/shoppingCart">
                                            <ShoppingCartIcon />
                                        </IconButton>
                                        <IconButton component={Link} to="/account">
                                            <PersonIcon />
                                        </IconButton>
                                        <Button variant="contained" startIcon={<LogoutIcon />} onClick={() => {
                                            appDispatch(signOut(null));
                                            localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
                                        }}>
                                            Ausloggen
                                        </Button>
                                    </>
                                ) : (
                                    <Button component={Link} to="/signIn" variant="contained" startIcon={<LoginIcon />}>
                                        Einloggen
                                    </Button>
                                )}
                            </Box>
                        </StyledToolbar>
                    </Container>
                </AppBar>
            </ThemeProvider >
        </>
    )
}

export default NavBar;