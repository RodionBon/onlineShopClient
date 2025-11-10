import { Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, InputAdornment, MenuItem, Select, Stack, TablePagination, TextField, Typography } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import { useCallback, useEffect, useMemo, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import PriceSlider from "./components/priceSlider";
import ProductCard from "./components/productCard";
import type { GetProductsRequestParams, GetProductsResponseParams, Product } from "~/types";
import { URL_BASE, GET_PRODUCTS_ENDPOINT } from "~/consts";

function ProductListPage() {
    const [products, setProducts] = useState<Product[]>([]);

    const [maxAvailablePrice, setMaxAvailablePrice] = useState(0);
    const [totalProductsCount, setTotalProductsCount] = useState(0);

    const [searchQuery, setSearchQuery] = useState("");
    const [priceRange, setPriceRange] = useState([0, 1]);
    const [isShowOnlyAvailable, setIsShowOnlyAvailable] = useState(true);

    const [sortOrder, setSortOrder] = useState("fromCheap");
    const [pageNumber, setPageNumber] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const memoizedProductList = useMemo(() => (
        <Grid container spacing={2}>
            {products.map((product: Product) => (
                <Grid size={{ xs: 3 }} key={product.id}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    ), [products]);

    const fetchProducts = useCallback(async (overrideParams: GetProductsRequestParams = {}, initialFetch = false) => {
        let baseParams: GetProductsRequestParams = {
            searchQuery,
            isShowOnlyAvailable: isShowOnlyAvailable.toString(),
            sortOrder,
            itemsPerPage: itemsPerPage.toString(),
            pageNumber: pageNumber.toString(),
        }

        if (!initialFetch) {
            baseParams = {
                ...baseParams,
                maxPrice: (priceRange[1] * 100).toString(),
                minPrice: (priceRange[0] * 100).toString(),
            }
        }

        const urlParams = new URLSearchParams({
            ...baseParams,
            ...overrideParams
        });

        const response = await fetch(`${URL_BASE}${GET_PRODUCTS_ENDPOINT}?${urlParams}`, {
            method: "GET",
        })
        const data = await response.json() as GetProductsResponseParams;

        const maxPrice = (data.maxAvailablePrice) / 100;

        setTotalProductsCount(data.totalProductsCount);
        setProducts(data.products);

        if (initialFetch) {
            setMaxAvailablePrice(maxPrice);
            setPriceRange([0, maxPrice]);
        }
    }, [searchQuery, sortOrder, pageNumber, itemsPerPage, priceRange, isShowOnlyAvailable]);

    useEffect(() => {
        fetchProducts({}, true);
    }, [])


    return (
        <Container sx={{ pt: 4 }}>
            <Stack gap={4} >
                <Grid container columnSpacing={2} rowSpacing={1} sx={{ alignSelf: 'stretch' }}>
                    <Grid size={8}>
                        <Typography variant="h5" sx={{ mb: 1 }}>Was suchen Sie?</Typography>
                        <Stack sx={{ flexGrow: 1, gap: 1, alignItems: 'stretch' }}>
                            <TextField
                                size="small"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
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
                                                    setSearchQuery("");
                                                }}>
                                                    <ClearIcon />
                                                </IconButton>
                                            </InputAdornment>,
                                    },
                                }} />
                            <FormControlLabel
                                control={<Checkbox checked={isShowOnlyAvailable} onChange={(e) => setIsShowOnlyAvailable(e.target.checked)} />}
                                label="Nur verfügbare Waren anzeigen"
                                labelPlacement="end"
                            />
                        </Stack>
                    </Grid>
                    <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                        <Typography variant="h5" sx={{ mb: 1 }}>Preisbereich</Typography>
                        <PriceSlider value={priceRange} maxValue={maxAvailablePrice} onChange={setPriceRange} />
                    </Grid>
                    <Grid size={12}>
                        <Button variant="contained" onClick={() => {
                            setPageNumber(0);
                            fetchProducts({ pageNumber: "0" });
                        }}>Filter anwenden</Button>
                    </Grid>
                </Grid>

                <Typography variant="h4" sx={{ mt: 4 }}>{totalProductsCount} Waren gefunden</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
                        <Typography>Sortieren nach:</Typography>
                        <Select size="small" value={sortOrder} onChange={(e) => {
                            const newSortOrder = e.target.value;
                            setSortOrder(newSortOrder);
                            fetchProducts({ sortOrder: newSortOrder });
                        }}>
                            <MenuItem value="fromCheap">Niedrigster Preis</MenuItem>
                            <MenuItem value="fromExpensive">Höchster Preis</MenuItem>
                            <MenuItem value="fromAtoZ">Von A bis Z</MenuItem>
                            <MenuItem value="fromZtoA">Von Z bis A</MenuItem>
                        </Select>
                    </Box>
                    <TablePagination
                        component="div"
                        count={totalProductsCount}
                        page={pageNumber}
                        onPageChange={(_, newPage) => {
                            setPageNumber(newPage);
                            fetchProducts({ pageNumber: newPage.toString() });
                        }}
                        onRowsPerPageChange={(event) => {
                            setPageNumber(0);

                            const newItemsPerPage = Number(event.target.value);
                            setItemsPerPage(newItemsPerPage);
                            fetchProducts({ pageNumber: "0", itemsPerPage: newItemsPerPage.toString() });
                        }}
                        rowsPerPage={itemsPerPage}
                    />
                </Box>

                {memoizedProductList}
            </Stack>
        </Container >
    )
}

export default ProductListPage
