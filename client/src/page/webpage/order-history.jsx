import { Divider, Paper, Container, Typography, Stack, Grid, Button, Box } from '@mui/material';

import { PageWrapper } from '../../style/util.style';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from './../../api/axios';

export default function OrderHistory() {
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        axios('get', '/order/member', null, resp => {
            setOrderList(resp.data.order)
        }, null, false)
    }, [])

    return (
        <PageWrapper>
            <Container sx={{ py: 4 }}>
                {
                    !orderList.length ?
                        <Typography textAlign='center' > you don't have any order yet </Typography>
                        :
                        orderList.map(order => {
                            return (
                                <Paper key={Math.random()} sx={{ p: 2, mb: 4 }}>
                                    <Stack justifyContent='space-between'>
                                        <Typography > Order Id : {order.orderNumber} </Typography>
                                        <Typography color='primary'> <b> {order.status} </b> </Typography>
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
                                    <Box textAlign='right'  >
                                        <Stack justifyContent='space-between'>
                                            <Typography> Provider : {order.provider} </Typography>
                                            <span> Delivery Price : {order.deliveryPrice?.toLocaleString()} </span>
                                        </Stack>
                                        <Stack justifyContent='space-between'>
                                            <Typography> Payment Method : {order.paymentMethod} </Typography>
                                            <span> <b> Total Price : {(Number(order.totalPrice) + Number(order.deliveryPrice))?.toLocaleString()} </b> </span>
                                        </Stack>
                                    </Box>
                                    <Divider sx={{ my: 2 }} />
                                    <Stack justifyContent='space-between' spacing={2}>
                                        <span> {order.createdAtDateTime} </span>
                                        <div>
                                            <Button
                                                component={Link}
                                                to={`/order/${order.orderNumber}`}
                                                variant='outlined'
                                            >
                                                More Info
                                            </Button>
                                            {
                                                order.status === 'waiting for payment' &&
                                                <Button
                                                    component={Link}
                                                    to={`/confirm-slip/${order.orderNumber}`}
                                                    variant='contained'
                                                    sx={{ ml: 2 }}
                                                >
                                                    Pay
                                                </Button>
                                            }
                                        </div>
                                    </Stack>
                                </Paper>
                            )
                        })
                }
            </Container>
        </PageWrapper>
    )
}