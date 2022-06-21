import { Grid, Container, Paper } from '@mui/material';
import { PageWrapper } from '../../style/util.style';

import MemberProfile from './member-profile';

export default function Member() {
    return (
        <PageWrapper >
            <Container sx={{ py: 4 }} >
                <Grid spacing={2} container>
                    <Grid xs={12} md={3} item> 1 </Grid>
                    <Grid xs={12} md={9} item>
                        <Paper sx={{ p: 4 }}>
                            <MemberProfile />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </PageWrapper>
    )
}