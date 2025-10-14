import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { createTheme, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, ThemeProvider, type DrawerProps } from '@mui/material';
import { deDE } from '@mui/material/locale';
import { Link } from 'react-router';


const drawerTheme = createTheme({
    components: {
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fontSize: 36,
                }
            }
        }
    }
}, deDE);

function AppDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: DrawerProps['onClose'] }) {
    return (
        <ThemeProvider theme={drawerTheme}>
            <Drawer open={isOpen} onClose={onClose}>
                <List sx={{ width: 400 }}>
                    <ListItemButton component={Link} to="/productList">
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText primary="Warenliste" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/cart">
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Warenkorb" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/account">
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Mein Konto" />
                    </ListItemButton>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Aussehen" />
                        <Select
                            defaultValue="system"
                            size="small"
                            variant='standard'
                        >
                            <MenuItem value="light">Hell</MenuItem>
                            <MenuItem value="dark">Dunkel</MenuItem>
                            <MenuItem value="system">System</MenuItem>
                        </Select>
                    </ListItem>
                    <ListItem >
                        <ListItemText primary="Sprache" />
                        <Select
                            defaultValue="de"
                            size="small"
                            variant='standard'
                        >
                            <MenuItem value="de">Deutsch</MenuItem>
                            <MenuItem value="ua">Ukrainisch</MenuItem>
                        </Select>
                    </ListItem>
                </List>
            </Drawer>
        </ThemeProvider>
    )
}

export default AppDrawer;