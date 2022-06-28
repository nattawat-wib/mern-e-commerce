import { Button, Container, Divider, Paper, Stack, Typography, Grid, Step, Stepper, StepLabel, Box, Skeleton } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import PaidIcon from '@mui/icons-material/Paid';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import { Link, useParams } from 'react-router-dom';
import { PageWrapper } from './../../style/util.style';
import { StyledResponsiveStepper, StyledStepIcon } from './../../style/product.style';
import { useState, useEffect } from 'react';
import axios from './../../api/axios';

export default function Order() {
    const { orderNumber } = useParams();
    const [order, setOrder] = useState({});
    const [isPageLoading, setIsPageLoading] = useState(false);

    const checkoutStatus = {
        'waiting for payment': 0,
        'waiting for review': 0,
        'waiting for shipping': 1,
        'success': 2,
    };

    useEffect(() => {
        axios('get', `/order/${orderNumber}`, null, resp => {
            setOrder(resp.data.order)
        }, null, false, [setIsPageLoading])
    }, [])

    const renderStepIcon = ({ active, completed, icon }) => {
        const iconList = [
            <InventoryIcon />,
            <PaidIcon />,
            <LocalShippingIcon />
        ];

        return (
            <StyledStepIcon status={{ active, completed }}>
                {iconList[icon - 1]}
            </StyledStepIcon>
        )
    }

    return (
        <PageWrapper>
            <Container sx={{ py: 4 }}>
                <Paper sx={{ p: 2 }}>
                    <Stack justifyContent='space-between'>
                        <Button
                            component={Link}
                            to='/order-history'
                            startIcon={<ArrowBackIcon />}
                        >
                            Back
                        </Button>
                        <Typography > Order Id : {order.orderNumber} </Typography>
                    </Stack>
                    <Divider sx={{ mb: 2 }} />

                    <StyledResponsiveStepper activeStep={checkoutStatus[order.status]} alternativeLabel  >
                        <Step key={1} >
                            <StepLabel StepIconComponent={renderStepIcon}>
                                Order Placed
                                <br />
                                {order.createdAtDateTime}
                            </StepLabel>
                        </Step>
                        <Step key={2} >
                            <StepLabel StepIconComponent={renderStepIcon}>
                                Order Paid
                                <br />
                                {order.paymentConfirmAtDateTime ? order.paymentConfirmAtDateTime : '-'}
                            </StepLabel >
                        </Step>
                        <Step key={3} >
                            <StepLabel StepIconComponent={renderStepIcon}>
                                Order Shipped
                                <br />
                                {order.shippingConfirmAtDateTime ? order.shippingConfirmAtDateTime : '-'}
                            </StepLabel>
                        </Step>
                    </StyledResponsiveStepper>

                    <Divider sx={{ my: 2 }} />
                    <div className='flex justify-between items-center'>
                        <Typography color='primary'> <b> status : {order.status} </b> </Typography>
                        {
                            order.status === 'waiting for payment' &&
                            <Button
                                component={Link}
                                to={`/confirm-slip/${order.orderNumber}`}
                                variant='contained'
                            >
                                Pay
                            </Button>
                        }
                    </div>
                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ mb: 2 }}>
                        <Stack justifyContent='start' >
                            <PersonPinCircleIcon color='primary' />
                            <Typography color='primary'> <b> Shipping Address </b> </Typography>
                        </Stack>
                        <Grid container spacing={2} alignItems='center' sx={{ mt: 2 }}>
                            <Grid xs={12} md={2} item>
                                <b> {isPageLoading ? <Skeleton /> : order?.address?.name} </b>
                            </Grid>
                            <Grid xs={12} md={10} item>
                                {
                                    isPageLoading ?
                                        <Skeleton /> :
                                        `${order?.address?.province} ${order?.address?.district} ${order?.address?.subDistrict} ${order?.address?.zipCode} ${order?.address?.detail}`
                                }
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider sx={{ mb: 2 }} />
                    {
                        isPageLoading ?
                            new Array(3).fill(1).map((item, i) => {
                                return (
                                    <Grid key={i} container alignItems='center' spacing={2}>
                                        <Grid xs={12} md={8} item>
                                            <Stack alignItems='center' justifyContent='start' spacing={2}>
                                                <Skeleton width={100} height={100} />
                                                <div className='w-full'>
                                                    <Skeleton width={'100%'} />
                                                    <Skeleton width={'100%'} />
                                                    <Skeleton width={'100%'} />
                                                </div>
                                            </Stack>
                                        </Grid>
                                        <Grid xs={12} md={1} item></Grid>
                                        <Grid xs={12} md={1} item>
                                            <Skeleton />
                                        </Grid>
                                        <Grid xs={12} md={2} item>
                                            <Skeleton />
                                        </Grid>
                                    </Grid>
                                )
                            })
                            :
                            order?.productList?.map(order => {
                                return (
                                    <Grid key={Math.random()} spacing={2} sx={{ mb: 2 }} container alignItems='center'>
                                        <Grid xs={8} item>
                                            <Stack >
                                                <img className='fix-img mr-4 rounded-md w-[100px] h-[100px]' src={`${import.meta.env.VITE_BASE_API}/${order.product.thumbnail}`} alt="" />
                                                <Typography className='w-[calc(100%-100px)] w-full'>
                                                    {order.product.name}
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid xs={1} item></Grid>
                                        <Grid xs={1} item>
                                            x{order.amount.toLocaleString()}
                                        </Grid>
                                        <Grid xs={2} item textAlign='right'>
                                            {order.totalPrice.toLocaleString()}
                                        </Grid>
                                    </Grid>
                                )
                            })
                    }
                    <Divider sx={{ my: 2 }} />
                    <div className='text-right'>
                        <span> Total Product : {order.totalProduct?.toLocaleString()} </span>
                        <br />
                        <span> Total Product Price : {order.totalPrice?.toLocaleString()} </span>
                        <br />
                        <Stack justifyContent='space-between'>
                            <Typography> Provider : {order.provider} </Typography>
                            <span> Delivery Price : {order.deliveryPrice?.toLocaleString()} </span>
                        </Stack>
                        <Stack justifyContent='space-between'>
                            <Typography> Payment Method : {order.paymentMethod} </Typography>
                            <span> <b> Total Price : {(Number(order.totalPrice) + Number(order.deliveryPrice))?.toLocaleString()} </b> </span>
                        </Stack>
                    </div>
                </Paper>
            </Container>
        </PageWrapper >
    )
}