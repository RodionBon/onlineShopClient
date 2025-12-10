import { Container, Typography } from "@mui/material";

function DatenschutzPage() {
    return (
        <Container sx={{ padding: 4 }}>
            <Typography variant="h4">Datenschutz</Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Hier finden Sie Informationen zum Datenschutz.
            </Typography>
        </Container>
    );
}

export default DatenschutzPage;