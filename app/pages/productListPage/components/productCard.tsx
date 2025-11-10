import { Box, Card, CardMedia, Typography } from "@mui/material"
import { priceFormatter } from "~/helpers";
import type { Product } from "~/types";

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
                        {priceFormatter.format(product.price / 100)}
                    </Typography>
                </Box>
            </Box>
        </Card>
    )
}