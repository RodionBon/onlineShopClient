import { Box, Button, Card, CardMedia, Checkbox, Container, FormControlLabel, Grid, IconButton, Input, InputAdornment, MenuItem, Select, Slider, Stack, TablePagination, TextField, Typography } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import { useRef, useState } from "react";

const ProductCard = () => {
    return <Card sx={(theme) => ({
        borderRadius: 1,
        padding: 1,
    })}>
        <CardMedia
            component="img"
            alt="Produktbild"
            height="140"
        />
        <Typography>
            Name der Ware
        </Typography>
        <Typography>
            Beschreibung der Ware
        </Typography>
        <Typography>
            Preis der Ware
        </Typography>
        <Button variant="contained" color="secondary">In den Warenkorb</Button>
    </Card>
}

function ProductListPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("fromCheap");
    const [onlyAvailable, setOnlyAvailable] = useState(false);
    const [priceRange, setPriceRange] = useState([1, 100]);
    const [page, setPage] = useState(5);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [foundProductsCount, setFoundProductsCount] = useState(100);

    return (
        <Stack>
            <Container>
                <Box>
                    <Typography>{foundProductsCount} Waren gefunden</Typography>

                    <TextField
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Suche"
                        slotProps={{
                            input: {
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => {
                                            setSearchTerm("");
                                        }}>
                                            <ClearIcon />
                                        </IconButton>
                                    </InputAdornment>,
                            },
                        }} />

                    <Typography>Sortieren nach:</Typography>
                    <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <MenuItem value="fromCheap">Niedrigster Preis</MenuItem>
                        <MenuItem value="fromExpensive">Höchster Preis</MenuItem>
                        <MenuItem value="fromAtoZ">Von A bis Z</MenuItem>
                        <MenuItem value="fromZtoA">Von Z bis A</MenuItem>
                    </Select>

                    <FormControlLabel
                        control={<Checkbox checked={onlyAvailable} onChange={(e) => setOnlyAvailable(e.target.checked)} />}
                        label="Nur verfügbare Waren anzeigen"
                        labelPlacement="start"
                    />

                    <Typography>Preisbereich:</Typography>
                    <TextField label="Von" variant="outlined" type="number" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} />
                    <TextField label="Bis" variant="outlined" type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} />
                    <Slider aria-label="Volume" value={priceRange} onChange={(e, newValue) => setPriceRange(newValue)} />

                    <Button variant="contained" color="secondary">Filter anwenden</Button>

                    <TablePagination
                        component="div"
                        count={foundProductsCount}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => setRowsPerPage(Number(event.target.value))}
                        rowsPerPage={rowsPerPage}
                    />
                </Box>

                <Grid container spacing={2}>
                    {Array.from(Array(26)).map((_, index) => (
                        <Grid size={{ xs: 3 }} key={index}>
                            <ProductCard />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Stack>
    )
}

export default ProductListPage
