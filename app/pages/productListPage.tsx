import { Box, Button, Card, CardMedia, Checkbox, Container, FormControlLabel, Grid, IconButton, InputAdornment, MenuItem, OutlinedInput, Select, Slider, Stack, TablePagination, TextField, Typography, type SxProps } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { priceFormatter } from "~/helpers";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductCard = () => {
    return <Card sx={() => ({
        borderRadius: 1,
    })}>
        <CardMedia
            component="img"
            alt="Produktbild"
            height="140"
            image="app/data/bild1.png"
        />
        <Box sx={{ px: 2, py: 1 }} >
            <Typography variant="h6" sx={{ mb: 2 }}>
                'ne gute Ware
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Beschreibung der Ware
                Beschreibung der Ware
                Beschreibung der Ware
                Beschreibung der Ware
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>
                    {priceFormatter.format(19.99)}
                </Typography>
                <IconButton color="secondary">
                    <AddShoppingCartIcon />
                </IconButton>
            </Box>
        </Box>
    </Card>
}

function PriceSlider({ value, onChange }: { value: number[], onChange: (newValue: number[]) => void }) {
    return (
        <Stack gap={1}>
            <Box sx={{ display: 'flex', alignItems: "baseline", gap: 1 }}>
                <TextField sx={{ flexGrow: 1 }} size="small" type="number" value={value[0]} onChange={(e) => onChange([Number(e.target.value), value[1]])} />
                <Typography>-</Typography>
                <TextField sx={{ flexGrow: 1 }} size="small" type="number" value={value[1]} onChange={(e) => onChange([value[0], Number(e.target.value)])} />
            </Box>
            <Slider value={value} onChange={(e, newValue) => onChange(newValue)} />
        </Stack>)
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
        <Container sx={{ pt: 4 }}>
            <Stack gap={4} >
                <Grid container columnSpacing={2} rowSpacing={1} sx={{ alignSelf: 'stretch' }}>
                    <Grid size={8}>
                        <Typography variant="h5" sx={{ mb: 1 }}>Was suchen Sie?</Typography>
                        <Stack sx={{ flexGrow: 1, gap: 1, alignItems: 'stretch' }}>
                            <TextField
                                size="small"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Suche"
                                slotProps={{
                                    input: {
                                        startAdornment:
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>,
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
                            <FormControlLabel
                                control={<Checkbox checked={onlyAvailable} onChange={(e) => setOnlyAvailable(e.target.checked)} />}
                                label="Nur verfügbare Waren anzeigen"
                                labelPlacement="end"
                            />
                        </Stack>
                    </Grid>
                    <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                        <Typography variant="h5" sx={{ mb: 1 }}>Preisbereich</Typography>
                        <PriceSlider value={priceRange} onChange={setPriceRange} />
                    </Grid>
                    <Grid size={12}>
                        <Button variant="contained">Filter anwenden</Button>
                    </Grid>
                </Grid>

                <Typography variant="h4" sx={{ mt: 4 }}>{foundProductsCount} Waren gefunden</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
                        <Typography>Sortieren nach:</Typography>
                        <Select size="small" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                            <MenuItem value="fromCheap">Niedrigster Preis</MenuItem>
                            <MenuItem value="fromExpensive">Höchster Preis</MenuItem>
                            <MenuItem value="fromAtoZ">Von A bis Z</MenuItem>
                            <MenuItem value="fromZtoA">Von Z bis A</MenuItem>
                        </Select>
                    </Box>
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
            </Stack>
        </Container>
    )
}

export default ProductListPage
