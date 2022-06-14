import { Container, Grid, Typography } from '@mui/material';
import { StyledFooter } from './../../style/footer.style';

const Footer = () => {
    return (
        <StyledFooter>
            <Container className='my-4'>
                <Grid container>
                    <Grid xs={12} sm={4} item>
                        <Typography> Category </Typography>
                        <Typography> Category </Typography>
                        <Typography> Category </Typography>
                        <Typography> Category </Typography>
                        <Typography> Category </Typography>
                    </Grid>
                    <Grid xs={12} sm={4} item>
                        <Typography> Contact </Typography>
                        <Typography> Contact </Typography>
                        <Typography> Contact </Typography>
                        <Typography> Contact </Typography>
                        <Typography> Contact </Typography>
                        <Typography> Contact </Typography>
                    </Grid>
                    <Grid xs={12} sm={4} item>
                        3
                    </Grid>
                </Grid>
            </Container>
        </StyledFooter>
    )
}

export default Footer