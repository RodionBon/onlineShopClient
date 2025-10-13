import { Box, Button, FilledInput, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { Link } from "react-router";

function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSignIn = () => {

    }

    return (
        <Box sx={{ border: '1px solid black', padding: 4, borderRadius: '10px' }}>
            <Typography>
                Einloggen
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
                onClick={handleSignIn}
            >
                Einloggen
            </Button>
            <Typography sx={{ marginTop: 2, fontSize: 18 }}>
                <Link to="/signUp">Wenn du kein Konto hast, kannst du es hier erstellen.</Link>
            </Typography>
        </Box>
    )
}

export default SignInPage
