import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserService } from "~/services/userService";
import { useAppDispatch } from "~/store/hooks";
import { signIn } from "~/store/userSlice";

function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const appDispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const response = await UserService.signUp({ email, password });

            appDispatch(signIn(response.user));
            localStorage.setItem("authToken", response.token);
            navigate('/');
        }
        catch (error) {
            setError(error instanceof Error ? error.message : "Fehler beim Einloggen");
        }
    }

    return (
        <Box sx={{ border: '1px solid black', padding: 4, borderRadius: '10px' }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
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
            <Typography sx={{ color: "red" }}>{error}</Typography>
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
