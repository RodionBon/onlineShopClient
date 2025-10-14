import { Box, Button, TextField, Typography } from "@mui/material"

function AccountPage() {
    return (
        <Box sx={{ paddingTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h2" gutterBottom>
                Mein Konto
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 400, maxWidth: '100%', padding: 2 }}>
                <TextField label="Name" variant="outlined" fullWidth />
                <TextField label="Nachname" variant="outlined" fullWidth />
                <Button variant="contained" color="primary">Daten aktualisieren</Button>
            </Box>
        </Box>
    )
}

export default AccountPage
