import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material"
import { formatPriceInCents, priceFormatter } from "~/helpers";
import type { Product } from "~/types";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { CartService } from "~/services/cartService";


export default function ProductCard({ product }: { product: Product }) {
    return (
        <Card sx={() => ({
            borderRadius: 1,
            filter: product.itemsLeft === 0 ? 'grayscale(100%)' : 'none',
        })}>
            <CardMedia
                component="img"
                alt="Produktbild"
                height="140"
                image="app/data/bild1.png"
            />
            <Box sx={{ px: 2, py: 1 }} >
                <Typography variant="h6" sx={{ mb: 2 }} noWrap>
                    {product.title}
                </Typography>
                <Typography variant="body2" sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    height: "4.5em",
                }} color="text.secondary">
                    {product.description}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography>
                        {formatPriceInCents(product.price)}
                    </Typography>
                    <IconButton onClick={() => {
                        CartService.addToCart(product.id);
                    }} color="secondary">
                        <AddShoppingCartIcon />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    )
}