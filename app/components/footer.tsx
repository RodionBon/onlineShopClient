import { Box, Container, Grid, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
    return (
        <Box sx={{ marginTop: 4, paddingY: 2, backgroundColor: 'primary.main' }}>
            <Container>
                <Grid container>
                    <Grid size={6} sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                        <Box>
                            <Typography >
                                Unsere Sozialnetzwerke
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                                <XIcon />
                                <InstagramIcon />
                                <YouTubeIcon />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={6} sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', gap: 1 }}>
                        <Typography>
                            Über uns
                        </Typography>
                        <Typography>
                            Datenschutz
                        </Typography>
                        <Typography>
                            Impressum
                        </Typography>
                        <Typography>
                            Cookie-Einstellungen
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Footer;