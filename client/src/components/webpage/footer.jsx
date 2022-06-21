import { Container, Grid, Typography } from '@mui/material';
import { StyledFooter } from './../../style/footer.style';

const Footer = () => {
    return (
        <StyledFooter>
            <Typography align='center' sx={{ my: 1 }}> © 2022 Shobhee. All Rights Reserved </Typography>
        </StyledFooter>
    )
}

export default Footer