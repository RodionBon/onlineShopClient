import { Alert, Box, Button, Snackbar, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useAppDispatch, useAppSelector } from "~/store/hooks"
import { updateUserData } from "~/store/userSlice";
import type { User } from "~/types";

function AccountPage() {
    const [isShowError, setIsShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editedUserData, setEditedUserData] = useState<User | null>(null);

    const appDispatch = useAppDispatch();
    const userData = useAppSelector(state => state.user.userData);

    useEffect(() => {
        setEditedUserData(userData);
    }, [userData]);


    return (
        <Box sx={{ paddingTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h2" gutterBottom>
                Mein Konto
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 400, maxWidth: '100%', padding: 2 }}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={editedUserData?.firstName || ""}
                    onChange={(e) => {
                        if (editedUserData)
                            setEditedUserData({ ...editedUserData, firstName: e.target.value })
                    }}
                    fullWidth />
                <TextField
                    label="Nachname"
                    variant="outlined"
                    value={editedUserData?.lastName || ""}
                    onChange={(e) => {
                        if (editedUserData)
                            setEditedUserData({ ...editedUserData, lastName: e.target.value })
                    }}
                    fullWidth />
                <TextField
                    label="Adresse"
                    variant="outlined"
                    value={editedUserData?.address || ""}
                    onChange={(e) => {
                        if (editedUserData)
                            setEditedUserData({ ...editedUserData, address: e.target.value })
                    }}
                    fullWidth />
                <NumericFormat
                    customInput={TextField}
                    prefix="+"
                    label="Telefon"
                    variant="outlined"
                    value={editedUserData?.phoneNumber || ""}
                    onValueChange={(values) => {
                        if (editedUserData)
                            setEditedUserData({ ...editedUserData, phoneNumber: values.value });
                    }}
                    fullWidth />
                <Button loading={loading} variant="contained" color="primary" onClick={async () => {
                    if (editedUserData) {
                        try {
                            setLoading(true);
                            await appDispatch(updateUserData(editedUserData)).unwrap();
                        }
                        catch (error) {
                            setIsShowError(true);
                        }
                        finally {
                            setLoading(false);
                        }
                    }
                }}>Daten aktualisieren</Button>

            </Box>
            <Snackbar open={isShowError} autoHideDuration={6000} onClose={() => setIsShowError(false)}>
                <Alert
                    severity="error"
                    variant="filled"
                >
                    Ein Fehler beim Aktualisieren der Benutzerdaten. Bitte versuche es später erneut.
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default AccountPage
