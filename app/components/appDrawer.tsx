import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, type DrawerProps } from '@mui/material';
import { Link } from 'react-router';

function AppDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: DrawerProps['onClose'] }) {
    return (
        <Drawer open={isOpen} onClose={onClose}>
            <List sx={{ width: 400 }}>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <ListIcon sx={{ fontSize: 36 }} />
                    </ListItemIcon>
                    <ListItemText primary="Warenliste" />
                </ListItemButton>
                <ListItemButton component={Link} to="/shoppingCart">
                    <ListItemIcon>
                        <ShoppingCartIcon sx={{ fontSize: 36 }} />
                    </ListItemIcon>
                    <ListItemText primary="Warenkorb" />
                </ListItemButton>
                <ListItemButton component={Link} to="/account">
                    <ListItemIcon>
                        <PersonIcon sx={{ fontSize: 36 }} />
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
    )
}

export default AppDrawer;