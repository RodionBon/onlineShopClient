import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container, createTheme, IconButton, ThemeProvider } from '@mui/material';
import { deDE } from '@mui/material/locale';

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
    return (
        <ThemeProvider theme={navBarTheme}>
            <Box sx={{ paddingY: 2, backgroundColor: 'primary.main' }}>
                <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton>
                        <MenuIcon />
                    </IconButton>
                    <Box>
                        <IconButton>
                            <ShoppingCartIcon />
                        </IconButton>
                        <IconButton>
                            <PersonIcon />
                        </IconButton>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default NavBar;