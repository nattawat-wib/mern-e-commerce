import { Container, Paper, Button, Typography, IconButton, Stack, Box, Grid } from '@mui/material';
import { PageWrapper } from "../../style/util.style";
import { Link } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import { StyledCartFooter } from './../../style/product.style';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';

const Checkout = () => {
    return (
        <PageWrapper >
            <Container sx={{ py: 4 }} >
                <Paper sx={{ p: 2, mb: 2 }}>
                    <Stack justifyContent='start' >
                        <PersonPinCircleIcon color='primary' />
                        <Typography color='primary'> <b> Shipping Address </b> </Typography>
                    </Stack>
                    <Grid container alignItems='center' sx={{ mt: 2 }}>
                        <Grid xs={12} md={2} item>
                            <b> nutella tester </b>
                        </Grid>
                        <Grid xs={12} md={8} item>
                            It depends... NASA Headquarters has two different addresses: an official mailing address and a delivery address. Using the correct address can be crucial.
                        </Grid>
                        <Grid xs={12} md={2} item>
                            <Button
                                variant='outlined'
                                size='small'
                                className='block ml-auto'
                            > Change </Button>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper sx={{ p: 2, mb: 1 }}>
                    <Grid spacing={2} container >
                        <Grid xs={12} md={6} item > <b> Product </b> </Grid>
                        <Grid xs={12} md={2} item > <b> Price </b> </Grid>
                        <Grid xs={12} md={2} item > <b> Quantity </b> </Grid>
                        <Grid xs={12} md={2} item > <b> Total Price </b> </Grid>
                    </Grid>
                </Paper>

                <Paper sx={{ p: 2, mb: 2 }} >
                    {
                        new Array(4).fill(1).map(product => {
                            return (
                                <Grid container key={Math.random()} spacing={2} className='items-center mb-4'>
                                    <Grid xs={12} md={6} item>
                                        <Stack alignItems='start' justifyContent='start' >
                                            <figure className='relative mr-4' style={{ width: '100px', height: '100px' }}>
                                                <img className='fit-img' src='https://figopetinsurance.com/sites/default/files/styles/blog_detail/public/imagedogpug-standing-leavesblog.jpg' />
                                            </figure>
                                            <Typography color='dark' style={{ width: 'calc(100% - 100px)' }}>
                                                [593บ.โค้ด615EL150] ZMI HA726 GaN 35W หัวชาร์จ พร้อมสาย GL870 สายชาร์จ iPhone iPad Mac USB-C 2 พอร์ต น้ำหนักเบา -2Y
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid xs={12} md={2} item> 1,500 </Grid>
                                    <Grid xs={12} md={2} item> 1 </Grid>
                                    <Grid xs={12} md={2} item> 3,000 </Grid>
                                </Grid>
                            )
                        })
                    }
                </Paper>

                <Paper sx={{ p: 2, mb: 2 }}>
                    
                    <Box alignItems='center' className='text-right' >
                        <Typography>
                            <b>Total Product </b>: 12
                        </Typography>
                        <Typography>
                            <b> All Price </b>: 1,500
                        </Typography>
                        <br />
                        <Button
                            component={Link}
                            to='/checkout'
                            variant='contained'
                            size='small'
                        >
                            Confirm Order
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </PageWrapper >
    )
}

export default Checkout;