import { Grid, Container } from '@mui/material';

import { PageWrapper } from './../../style/util.style';
import ProductCard from '../../components/webpage/product-card';

const Index = () => {
    return (
        <PageWrapper>
            <Container sx={{ py: 6 }} >
                <Grid container spacing={3}>
                    {
                        new Array(14).fill(1).map((product, i) => {
                            return (
                                <Grid item xs={12} sm={6} md={3} key={i} >
                                    <ProductCard />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </PageWrapper>
    )
}

export default Index