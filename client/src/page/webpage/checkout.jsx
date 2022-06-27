import { Container, Paper, Button, Typography, TextField, IconButton, Stack, Box, Grid, MenuItem, RadioGroup, FormLabel, FormControlLabel, Radio } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { PageWrapper } from "../../style/util.style";
import { Link } from 'react-router-dom';
import { StyledCartFooter } from './../../style/product.style';
import { useState, useEffect } from 'react';
import axios from './../../api/axios';

const Checkout = () => {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios('get', '/cart', null, resp => {
            setProductList(resp.data.cart)
        })
    }, [])

    return (
        <PageWrapper >
            <Container sx={{ pb: 4, pt: 3 }} >
                <Button
                    component={Link}
                    to='/cart'
                    startIcon={<ArrowBackIcon />}
                    size='small'
                >
                    Back to cart
                </Button>
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
                        productList.productList?.map(item => {
                            return (
                                <Grid container key={Math.random()} spacing={2} className='items-center mb-4'>
                                    <Grid xs={12} md={6} item>
                                        <Stack alignItems='start' justifyContent='start' >
                                            <figure className='relative mr-4' style={{ width: '100px', height: '100px' }}>
                                                <img className='fit-img rounded-md' src={`${import.meta.env.VITE_BASE_API}/${item.product.thumbnail}`} />
                                            </figure>
                                            <Typography color='dark' style={{ width: 'calc(100% - 100px)' }}>
                                                {item.product.name}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid xs={12} md={2} item> {item.product.price.toLocaleString()} </Grid>
                                    <Grid xs={12} md={2} item> {item.amount.toLocaleString()} </Grid>
                                    <Grid xs={12} md={2} item> {item.totalPrice.toLocaleString()} </Grid>
                                </Grid>
                            )
                        })
                    }
                </Paper>

                <Paper sx={{ p: 2, mb: 2 }}>
                    <Grid container spacing={2}>
                        <Grid xs={4} item>
                            <TextField
                                label='provider'
                                select
                                fullWidth
                                size='small'
                            >
                                <MenuItem>
                                    Kerry Express
                                </MenuItem>
                                <MenuItem>
                                    Thai Post
                                </MenuItem>
                                <MenuItem>
                                    Flash
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid xs={1} item></Grid>
                        <Grid xs={3} item>
                            <FormLabel> Payment Method </FormLabel>
                            <RadioGroup>
                                <FormControlLabel name='paymentMethod' value='1' control={<Radio />} label='Bank Transfer' />
                                <FormControlLabel name='paymentMethod' disabled value='1' control={<Radio />} label='Credit Card' />
                                <FormControlLabel name='paymentMethod' disabled value='1' control={<Radio />} label='Crash On Delivery' />
                            </RadioGroup>
                        </Grid>
                        <Grid xs={4} item>
                            <Box alignItems='center' className='text-right' >
                                <Typography sx={{ mb: 1 }}>
                                    <b>Total Product </b>: {productList.totalProduct?.toLocaleString()}
                                </Typography>
                                <Typography sx={{ mb: 1 }}>
                                    <b> All Price </b>: {productList.totalPrice?.toLocaleString()}
                                </Typography>
                                <Typography sx={{ mb: 1 }}>
                                    <b> Delivery Price </b>: 40
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

                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </PageWrapper >
    )
}

export default Checkout;