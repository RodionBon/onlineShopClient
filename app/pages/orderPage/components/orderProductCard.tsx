import { Box, Card, CardMedia, Typography } from "@mui/material"
import { formatPriceInCents } from "~/helpers";
import type { CartItem } from "~/types";


export const OrderProductCard = ({ cartItem }: { cartItem: CartItem }) => {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                pb: 1,
            }}
        >
            <CardMedia
                image="app/data/bild1.png"
                component="img"
                alt="Produktbild"
                sx={{ height: 190, borderRadius: 1 }}
            />

            <Box sx={{ width: "100%", display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: "space-around" }}>
                <Typography variant="body1">
                    {cartItem.quantity} St.
                </Typography>

                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'secondary.main' }} >
                    {formatPriceInCents(cartItem.quantity * cartItem.product.price)}
                </Typography>
            </Box>
        </Card>
    )
}
