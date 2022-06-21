import { useState } from 'react';
import { Grid, Container, Paper, Button, Typography, IconButton, Stack } from '@mui/material';
import { PageWrapper } from '../../style/util.style';
import { Link } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';

import { StyledCartFooter } from './../../style/product.style';
import SnippetInput from '../../components/util/snippet-input';

const Cart = () => {
    return (
        <PageWrapper>
            <Container sx={{ py: 4 }} >
                <Paper sx={{ p: 2, mb: 2 }}>
                    <Grid spacing={2} container >
                        <Grid xs={12} md={5} item> <b> Product </b> </Grid>
                        <Grid xs={12} md={2} item> <b> Price </b> </Grid>
                        <Grid xs={12} md={2} item> <b> Quantity </b> </Grid>
                        <Grid xs={12} md={2} item> <b> Total Price </b> </Grid>
                        <Grid xs={12} md={1} item> <b> Action </b> </Grid>
                    </Grid>
                </Paper>

                <Paper sx={{ p: 2, mb: 2 }} >
                    {
                        new Array(10).fill(1).map(product => {
                            return (
                                <Grid container key={Math.random()} spacing={2} className='items-center mb-4'>
                                    <Grid xs={12} md={5} item>
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
                                    <Grid xs={12} md={2} item> <SnippetInput /> </Grid>
                                    <Grid xs={12} md={2} item> 3,000 </Grid>
                                    <Grid xs={12} md={1} item>
                                        <IconButton>
                                            <DeleteIcon color='error' />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                </Paper>

                <StyledCartFooter>
                    <Paper sx={{ p: 2, mb: 2 }}>
                        <Grid spacing={2} container alignItems='center' >
                            <Grid xs={12} md={5} item> <b> Total Product : 12 </b> </Grid>
                            <Grid xs={12} md={3} item> </Grid>
                            <Grid xs={12} md={2} item> <b> All Price : 1,500 </b> </Grid>
                            <Grid xs={12} md={2} item>
                                <Button 
                                component={Link}
                                to='/checkout'
                                variant='contained' 
                                size='small'
                                > 
                                Checkout
                                 </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </StyledCartFooter>
            </Container>
        </PageWrapper>
    )
}

export default Cart;