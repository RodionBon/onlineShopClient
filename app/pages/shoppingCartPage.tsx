import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, Card, CardMedia, Container, IconButton, Input, TextField, Typography } from "@mui/material";
import { useState } from "react";

const priceFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

const ShoppingCartProductCard = () => {
    const priceForOne = 2000.50;
    const [quantity, setQuantity] = useState(1);

    return <Card sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        px: 2,
    }}>
        <CardMedia
            component="img"
            alt="Produktbild"
            sx={{ width: 140, borderRadius: 1 }}
        />

        <Typography sx={{ flex: 1, paddingLeft: 2 }} variant="h5">
            eine gute Ware
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 'bold' }}>
                {priceFormatter.format(priceForOne)} X
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, ml: 4 }}>
                <IconButton onClick={() => setQuantity(quantity + 1)}>
                    <AddIcon />
                </IconButton>

                <TextField
                    sx={{ width: '60px' }}
                    value={quantity}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        if (!isNaN(value)) {
                            setQuantity(value);
                        }
                    }} />

                <IconButton disabled={quantity <= 1} onClick={() => setQuantity(quantity - 1)}>
                    <RemoveIcon />
                </IconButton>
            </Box>

            <Typography sx={{ minWidth: '150px', paddingLeft: 2, fontWeight: 'bold', color: 'secondary.main', textAlign: 'right' }} variant="h5">
                {priceFormatter.format(quantity * priceForOne)}
            </Typography>
        </Box>

    </Card>
}


function ShoppingCartPage() {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 4 }}>
            <Typography variant="h2">Warenkorb</Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                {Array.from({ length: 3 }).map(() => <ShoppingCartProductCard />)}
            </Box>

            <Typography sx={{ alignSelf: 'flex-end' }} variant="h5">Gesamtpreis:</Typography>
            <Typography sx={{ alignSelf: 'flex-end' }} variant="h3">{priceFormatter.format(2000)}</Typography>

            <Button
                variant="contained"
                color="primary"
                sx={{ px: 5, fontSize: '32px', alignSelf: 'flex-end' }}
            >
                Zur Kasse
            </Button>
        </Container>
    )
}

export default ShoppingCartPage;