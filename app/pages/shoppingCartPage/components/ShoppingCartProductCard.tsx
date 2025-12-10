import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Card, CardMedia, IconButton, TextField, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { formatPriceInCents } from '~/helpers';
import { CartService } from '~/services/cartService';
import type { CartItem } from '~/types';
import DeleteIcon from '@mui/icons-material/Delete';


export type ShoppingCartProductCardProps = {
    item: CartItem;
    onDelete: (id: number) => void;
    onChange: (id: number, quantity: number) => void;
    onError: () => void;
}


export const ShoppingCartProductCard = ({ item, onDelete, onChange, onError }: ShoppingCartProductCardProps) => {
    const priceForOne = item.product.price;
    const [quantity, setQuantity] = useState(item.quantity);

    const updateQuantity = useCallback(async (newQuantity: number) => {
        try {
            await CartService.updateCartItem(item.product.id, newQuantity);
            setQuantity(newQuantity);
            onChange(item.product.id, newQuantity);
        }
        catch (error) {
            onError();
        }
    }, [item.product.id]);

    const deleteCartItem = useCallback(async () => {
        try {
            await CartService.deleteCartItem(item.product.id);
            onDelete(item.product.id);
        }
        catch (error) {
            onError();
        }
    }, [item.product.id]);


    return <Card sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        px: 2,
    }}>
        <IconButton sx={{ mr: 2 }} color="secondary" onClick={deleteCartItem}>
            <DeleteIcon />
        </IconButton>

        <CardMedia
            component="img"
            alt="Produktbild"
            sx={{ width: 140, borderRadius: 1 }}
        />

        <Typography sx={{ flex: 1, paddingLeft: 2 }} variant="h5">
            {item.product.title}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 'bold' }}>
                {formatPriceInCents(priceForOne)} X
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, ml: 4 }}>
                <IconButton disabled={quantity >= item.product.itemsLeft} onClick={() => updateQuantity(quantity + 1)}>
                    <AddIcon />
                </IconButton>

                <TextField
                    sx={{ width: '60px' }}
                    value={quantity}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        if (!isNaN(value)) {
                            updateQuantity(value);
                        }
                    }} />

                <IconButton disabled={quantity <= 1} onClick={() => updateQuantity(quantity - 1)}>
                    <RemoveIcon />
                </IconButton>
            </Box>

            <Typography sx={{ minWidth: '150px', paddingLeft: 2, fontWeight: 'bold', color: 'secondary.main', textAlign: 'right' }} variant="h5">
                {formatPriceInCents(quantity * priceForOne)}
            </Typography>
        </Box>

    </Card>
}
