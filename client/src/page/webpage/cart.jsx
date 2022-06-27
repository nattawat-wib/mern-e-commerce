import { useState, useEffect } from 'react';
import { Grid, Container, Paper, Button, Typography, IconButton, Stack } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import { StyledCartFooter } from './../../style/product.style';
import SnippetInput from '../../components/util/snippet-input';
import axios from '../../api/axios';
import { PageWrapper } from '../../style/util.style';
import { Link } from 'react-router-dom';
import { useToggleContext } from '../../context/toggle-context';

const Cart = () => {
    const [cartList, setCartList] = useState([]);
    const { setNavCartItem } = useToggleContext()

    useEffect(() => {
        axios('get', '/cart', null, resp => setCartList(resp.data.cart), null, false)
    }, [])

    console.log(cartList);

    const handleDeleteProduct = skuId => {
        axios('delete', `/cart/${skuId}`, null, resp => {
            setNavCartItem(resp.data.cart.totalProduct)
            axios('get', '/cart', null, resp => setCartList(resp.data.cart), null, false)
        })
    }

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
                        !cartList.productList?.length ?
                            <Typography textAlign='center' sx={{ my: 10}}> <b> "no product in your cart" </b> </Typography>
                            :
                            cartList.productList?.map(item => {
                                return (
                                    <Grid container key={Math.random()} spacing={2} className='items-center mb-4'>
                                        <Grid xs={12} md={5} item>
                                            <Stack alignItems='start' justifyContent='start' >
                                                <figure className='relative mr-4' style={{ width: '100px', height: '100px' }}>
                                                    <img className='fit-img' src={`${import.meta.env.VITE_BASE_API}/${item.product.thumbnail}`} />
                                                </figure>
                                                <Typography color='dark' style={{ width: 'calc(100% - 100px)' }}>
                                                    {item.product.name}
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid xs={12} md={2} item> {item.product.price?.toLocaleString()} </Grid>
                                        <Grid xs={12} md={2} item> <SnippetInput useApiHere={true} value={item.amount} /> </Grid>
                                        <Grid xs={12} md={2} item> {item.totalPrice?.toLocaleString()} </Grid>
                                        <Grid xs={12} md={1} item>
                                            <IconButton
                                                onClick={() => handleDeleteProduct(item.product.skuId)}
                                            >
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
                            <Grid xs={12} md={5} item> <b> Total Product : {cartList.totalProduct?.toLocaleString()} </b> </Grid>
                            <Grid xs={12} md={3} item> </Grid>
                            <Grid xs={12} md={2} item> <b> All Price : {cartList.totalPrice?.toLocaleString()} </b> </Grid>
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