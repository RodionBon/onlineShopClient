import { Alert, Box, Button, CircularProgress, Container, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Radio, RadioGroup, Snackbar, Stack, styled, TextField, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react";
import { PatternFormat } from "react-number-format";
import { formatPriceInCents } from "~/helpers";
import { CartService } from "~/services/cartService";
import { OrderService } from "~/services/orderService";
import { useAppSelector } from "~/store/hooks";
import type { CartItem, CreateOrderRequestParams, FormErrors } from "~/types";
import { Field, Form, Formik } from 'formik';
import { COUNTRY_PHONE_CODE } from "~/consts";
import { OrderProductCard } from "./components/orderProductCard";


const FullWidthFormControl = styled(FormControl)({
    width: "100%"
})

const defaultValues: CreateOrderRequestParams = {
    userId: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    paymentMethod: "card",
}


function OrderPage() {
    const userData = useAppSelector(state => state.user.userData);
    const [initialData, setInitialData] = useState<CreateOrderRequestParams | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isShowError, setIsShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(false);

    const totalPrice = useMemo(() => cartItems.reduce(
        (total, item) =>
            total + item.product.price * item.quantity,
        0), [cartItems]);


    const fetchCart = async () => {
        try {
            setIsDataLoading(true);
            const items = await CartService.getCart();
            setCartItems(items);
        } catch (error) {
            setIsShowError(true);
            setErrorMessage("Fehler beim Laden des Warenkorbs.");
        } finally {
            setIsDataLoading(false);
        }
    }

    const handleCreateOrder = async (values: CreateOrderRequestParams) => {
        try {
            setIsSubmitLoading(true);
            const newValues = { ...values, phoneNumber: COUNTRY_PHONE_CODE + values.phoneNumber };
            const response = await OrderService.createOrder(newValues);
        } catch (error) {
            setIsShowError(true);
            setErrorMessage("Fehler beim Erstellen der Bestellung.");
        } finally {
            setIsSubmitLoading(false);
        }
    }

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        if (userData) {
            const { id, email, ...restUserData } = userData;
            setInitialData({ ...defaultValues, ...restUserData, userId: id, });
        }
    }, [userData]);


    return (
        <Container>
            <Grid container spacing={2} sx={{ paddingTop: 4 }} >
                <Grid size={9} sx={{ p: 2 }} >
                    <Stack spacing={2}>
                        <Typography variant="h4">
                            Bitte geben Sie Ihren Daten ein
                        </Typography>
                        {initialData ?
                            <Formik
                                initialValues={initialData}
                                onSubmit={handleCreateOrder}
                                validate={(values) => {
                                    const errors: FormErrors<CreateOrderRequestParams> = {};
                                    if (!values.firstName) {
                                        errors.firstName = "Bitte geben Sie einen gültigen Vornamen ein.";
                                    }
                                    if (!values.phoneNumber || values.phoneNumber.replace(/\D/g, '').length < 10) {
                                        errors.phoneNumber = "Bitte geben Sie eine gültige Telefonnummer ein.";
                                    }
                                    if (!values.address) {
                                        errors.address = "Bitte geben Sie eine gültige Adresse ein.";
                                    }
                                    if (!values.paymentMethod) {
                                        errors.paymentMethod = "Bitte wählen Sie eine Zahlungsart.";
                                    }
                                    return errors;
                                }}
                            >
                                {({ values, handleChange, errors, touched }) => {
                                    return (
                                        <Form>
                                            <Stack spacing={2}>
                                                <Box>
                                                    <Grid container spacing={2}>
                                                        <Grid size={6}>
                                                            <FullWidthFormControl error={Boolean(errors.firstName)}>
                                                                <Field
                                                                    as={TextField}
                                                                    label="Vorname"
                                                                    name="firstName"
                                                                    error={Boolean(errors.firstName)} />
                                                                <FormHelperText>
                                                                    {errors.firstName}
                                                                </FormHelperText>
                                                            </FullWidthFormControl>
                                                        </Grid>
                                                        <Grid size={6}>
                                                            <FullWidthFormControl error={Boolean(errors.lastName)}>
                                                                <Field
                                                                    as={TextField}
                                                                    label="Nachname"
                                                                    name="lastName"
                                                                    error={Boolean(errors.lastName)} />
                                                                <FormHelperText>
                                                                    {errors.lastName}
                                                                </FormHelperText>
                                                            </FullWidthFormControl>
                                                        </Grid>
                                                        <Grid size={6}>
                                                            <FullWidthFormControl error={Boolean(errors.address)}>
                                                                <Field
                                                                    as={TextField}
                                                                    error={Boolean(errors.address)}
                                                                    label="Adresse"
                                                                    name="address" />
                                                                <FormHelperText>
                                                                    {errors.address}
                                                                </FormHelperText>
                                                            </FullWidthFormControl>
                                                        </Grid>
                                                        <Grid size={6}>
                                                            <FullWidthFormControl error={Boolean(errors.phoneNumber)}>
                                                                <PatternFormat
                                                                    customInput={TextField}
                                                                    name="phoneNumber"
                                                                    label="Telefonnummer"
                                                                    error={Boolean(errors.phoneNumber)}
                                                                    value={values.phoneNumber}
                                                                    format={`+${COUNTRY_PHONE_CODE} ## ########`}
                                                                    mask="_"
                                                                    onValueChange={
                                                                        (values, e) => {
                                                                            const target = e.event?.target;
                                                                            if (target && 'name' in target) {
                                                                                handleChange({ target: { name: target.name, value: values.value } })
                                                                            }
                                                                        }} />
                                                                <FormHelperText>
                                                                    {errors.phoneNumber}
                                                                </FormHelperText>
                                                            </FullWidthFormControl>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                                <Box>
                                                    <FormControl error={Boolean(errors.paymentMethod)}>
                                                        <FormLabel>Zahlungsart</FormLabel>
                                                        <RadioGroup
                                                            defaultValue={initialData.paymentMethod}>
                                                            <FormControlLabel name="paymentMethod" value="card" onChange={handleChange} control={<Radio />} label="Kreditkarte" />
                                                            <FormControlLabel name="paymentMethod" value="cash" onChange={handleChange} control={<Radio />} label="Barzahlung" />
                                                        </RadioGroup>
                                                        <FormHelperText>
                                                            {errors.paymentMethod}
                                                        </FormHelperText>
                                                    </FormControl>
                                                </Box>
                                                <Button type="submit" loading={isSubmitLoading} variant="contained">
                                                    Fertig
                                                </Button>
                                            </Stack>
                                        </Form>
                                    )
                                }}
                            </Formik>
                            :
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100%" }}>
                                <CircularProgress enableTrackSlot />
                            </Box>
                        }
                    </Stack>
                </Grid>
                <Grid size={3} >
                    <Stack spacing={2} sx={{ minHeight: "100%" }}>
                        <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                            <Typography variant="h5">
                                Gesamtpreis:
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                                {formatPriceInCents(totalPrice)}
                            </Typography>
                        </Box>
                        {isDataLoading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100%" }}>
                                <CircularProgress enableTrackSlot />
                            </Box>
                        ) : (
                            cartItems.map((cartItem) => <OrderProductCard cartItem={cartItem} />)
                        )}
                    </Stack>
                </Grid>
            </Grid>

            <Snackbar open={isShowError} autoHideDuration={6000} onClose={() => setIsShowError(false)}>
                <Alert
                    severity="error"
                    variant="filled"
                >
                    {errorMessage || "Ein unbekannter Fehler ist aufgetreten."} Bitte versuche es später erneut.
                </Alert>
            </Snackbar>
        </Container >
    )
}

export default OrderPage
