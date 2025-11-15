import { Alert, Box, Button, Container, Snackbar, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from 'react-router';
import { formatPriceInCents } from '~/helpers';
import { CartService } from '~/services/cartService';
import type { CartItem } from '~/types';
import { ShoppingCartProductCard } from "./components/ShoppingCartProductCard";


function ShoppingCartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [open, setOpen] = useState(false);

    const totalPrice = useMemo(() => {
        return formatPriceInCents(cartItems.reduce(
            (total, item) =>
                total + item.product.price * item.quantity,
            0));
    }, [cartItems]);

    const onDelete = useCallback((id: number) => {
        setCartItems((prevItems) => prevItems.filter(item => item.product.id !== id));
    }, []);

    const onChange = useCallback((id: number, quantity: number) => {
        setCartItems((prevItems) => {
            return prevItems.map(item => item.product.id === id ? { ...item, quantity } : item);
        });
    }, []);

    const fetchCartItems = useCallback(async () => {
        try {
            const items = await CartService.getCart();
            setCartItems(items);
        } catch (error) {
            setOpen(true);
        }
    }, [CartService]);

    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);


    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 4 }}>
            <Typography variant="h2">Warenkorb</Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                {cartItems.length ?
                    cartItems.map(item =>
                        <ShoppingCartProductCard
                            key={item.product.id}
                            item={item}
                            onDelete={onDelete}
                            onChange={onChange}
                            onError={() => { setOpen(true) }}
                        />
                    ) :
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
                        <Typography variant="h5">Dein Warenkorb ist leer.</Typography>
                    </Box>
                }
            </Box>

            <Typography sx={{ alignSelf: 'flex-end' }} variant="h5">Gesamtpreis:</Typography>
            <Typography sx={{ alignSelf: 'flex-end' }} variant="h3">{totalPrice}</Typography>

            <Button
                variant="contained"
                color="primary"
                sx={{ px: 5, fontSize: '32px', alignSelf: 'flex-end' }}
                component={Link}
                to="/order"
            >
                Zur Kasse
            </Button>

            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert
                    severity="error"
                    variant="filled"
                >
                    Ein Fehler beim Abrufen des Warenkorbs. Bitte versuche es später erneut.
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default ShoppingCartPage;