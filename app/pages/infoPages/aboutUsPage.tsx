import { Container, Typography } from "@mui/material";

function AboutUsPage() {
    return (
        <Container sx={{ padding: 4 }}>
            <Typography variant="h4">Über uns</Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Hier finden Sie Informationen über unser Unternehmen.
            </Typography>
        </Container>
    );
}

export default AboutUsPage;