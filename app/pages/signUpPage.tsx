import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { Link } from "react-router";

function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSignUp = () => {

    }

    return (
        <Box sx={{ border: '1px solid black', padding: 4, borderRadius: '10px' }}>
            <Typography>
                Konto erstellen
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Passwort"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSignUp}
            >
                Konto erstellen
            </Button>
            <Typography sx={{ marginTop: 2, fontSize: 18 }}>
                <Link to="/signIn">Wenn du bereits ein Konto hast, kannst du hier einloggen.</Link>
            </Typography>
        </Box>
    )
}

export default SignUpPage
