import { Divider, Paper, Container, Typography, Stack, Grid, Button, Box } from '@mui/material';

import { PageWrapper } from '../../style/util.style';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from './../../api/axios';

export default function OrderHistory() {
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        axios('get', '/order', null, resp => {
            setOrderList(resp.data.order)
        }, null, false)
    }, [])

    console.log(orderList);

    return (
        <PageWrapper>
            <Container sx={{ py: 4 }}>
                {
                    orderList.map(order => {
                        return (
                            <Paper key={Math.random()} sx={{ p: 2, mb: 4 }}>
                                <Stack justifyContent='space-between'>
                                    <Typography > Order Id : {order.orderNumber} </Typography>
                                    <Typography color='success.main'> <b> {order.status} </b> </Typography>
                                </Stack>
                                <Divider sx={{ my: 2 }} />
                                {
                                    order.productList.map(item => {
                                        return (
                                            <Grid key={Math.random()} spacing={2} sx={{ mb: 2 }} container alignItems='center'>
                                                <Grid xs={8} item>
                                                    <Stack >
                                                        <img className='fix-img mr-4 rounded-md w-[100px] h-[100px]' src={`${import.meta.env.VITE_BASE_API}/${item.product.thumbnail}`} alt="" />
                                                        <Typography className='w-[calc(100%-100px)] w-full'> {item.product.name} </Typography>
                                                    </Stack>
                                                </Grid>
                                                <Grid xs={1} item></Grid>
                                                <Grid xs={1} item>
                                                    x{item.amount}
                                                </Grid>
                                                <Grid xs={2} item textAlign='right'>
                                                    {item.totalPrice.toLocaleString()}
                                                </Grid>
                                            </Grid>
                                        )
                                    })
                                }
                                <Box textAlign='right' className='font-bold' >
                                    <span> Total Product : {order.totalProduct.toLocaleString()} </span>
                                    <br />
                                    <span> Total Price : {order.totalPrice.toLocaleString()} </span>
                                    <br />
                                    <span> Delivery Price : {order.deliveryPrice.toLocaleString()} </span>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <Stack justifyContent='end' spacing={2}>
                                    <Button
                                        component={Link}
                                        to={`/order/${order.orderNumber}`}
                                        variant='outlined'
                                    >
                                        More Info
                                    </Button>
                                    <Button
                                        component={Link}
                                        to={`/confirm-slip/${order.orderNumber}`}
                                        variant='contained'
                                    >
                                        Pay
                                    </Button>
                                </Stack>
                            </Paper>
                        )
                    })
                }
            </Container>
        </PageWrapper>
    )
}