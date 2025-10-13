import { Container, Typography } from "@mui/material";

function ImpressumPage() {
    return (
        <Container sx={{ padding: 4 }}>
            <Typography variant="h4">Impressum</Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Hier finden Sie Informationen zum Impressum.
            </Typography>
        </Container>
    );
}

export default ImpressumPage;