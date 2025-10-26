import { Box, Button, Card, CardMedia, Container, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack, styled, TextField, Typography } from "@mui/material"

const priceFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

const OrderProductCard = () => {
    const priceForOne = 2000.50;
    const quantity = 1;

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                px: 1,
                pb: 1,
            }}
        >
            <CardMedia
                component="img"
                alt="Produktbild"
                sx={{ height: 190, borderRadius: 1 }}
            />

            <Box sx={{ width: "100%", display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: "space-around" }}>
                <Typography sx={{ fontSize: 12 }}>
                    1 St.
                </Typography>

                <Typography sx={{ fontWeight: 'bold', color: 'secondary.main' }} >
                    {priceFormatter.format(quantity * priceForOne)}
                </Typography>
            </Box>
        </Card>
    )
}

const FullWidthTextField = styled(TextField)({
    width: "100%"
})

function OrderPage() {
    const totalPrice = 2000;

    return (
        <Container>
            <Grid container spacing={2} sx={{ paddingTop: 4 }} >
                <Grid size={9} sx={{ p: 2 }} >
                    <Stack spacing={2}>
                        <Typography variant="h4">
                            Bitte geben Sie Ihren Daten ein
                        </Typography>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <FullWidthTextField label="Vorname" />
                                </Grid>
                                <Grid size={6}>
                                    <FullWidthTextField label="Nachname" />
                                </Grid>
                                <Grid size={6}>
                                    <FullWidthTextField label="Straße" />
                                </Grid>
                                <Grid size={6}>
                                    <FullWidthTextField label="Telefonnummer" />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormLabel>Zahlungsart</FormLabel>
                                <RadioGroup>
                                    <FormControlLabel value="creditCard" control={<Radio />} label="Kreditkarte" />
                                    <FormControlLabel value="cash" control={<Radio />} label="Barzahlung" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Button variant="contained">
                            Fertig
                        </Button>
                    </Stack>
                </Grid>
                <Grid size={3}>
                    <Stack spacing={2}>
                        <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                            <Typography>
                                Gesamtpreis:
                            </Typography>
                            <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: 'secondary.main' }}>
                                {priceFormatter.format(totalPrice)}
                            </Typography>
                        </Box>
                        {Array.from({ length: 3 }).map(() => <OrderProductCard />)}
                    </Stack>
                </Grid>
            </Grid>
        </Container >
    )
}

export default OrderPage
