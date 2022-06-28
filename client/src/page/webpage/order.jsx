import { Button, Container, Divider, Paper, Stack, Typography, Grid, Step, Stepper, StepLabel, Box } from '@mui/material';

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

    useEffect(() => {
        axios('get', `/order/${orderNumber}`, null, resp => {
            console.log(resp.data.order);
            setOrder(resp.data.order)
        }, null, false)
    }, [])

    console.log(order);

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

                    <StyledResponsiveStepper activeStep={1} alternativeLabel  >
                        <Step key={1} >
                            <StepLabel StepIconComponent={renderStepIcon}>
                                Order Placed
                                <br />
                                10/02/2022 12:12
                            </StepLabel>
                        </Step>
                        <Step key={2} >
                            <StepLabel StepIconComponent={renderStepIcon}>
                                Order Paid
                                {
                                    true &&
                                    <>
                                        <br />
                                        10/02/2022 12:12
                                    </>
                                }
                            </StepLabel >
                        </Step>
                        <Step key={3} >
                            <StepLabel StepIconComponent={renderStepIcon}>
                                Order Shipped
                                {
                                    true &&
                                    <>
                                        <br />
                                        10/02/2022 12:12
                                    </>
                                }
                            </StepLabel>
                        </Step>
                    </StyledResponsiveStepper>

                    <Divider sx={{ my: 2 }} />
                    <div className='flex justify-end'>
                        <Button
                            component={Link}
                            to={`/confirm-slip/${Math.random().toString().slice(2)}`}
                            variant='contained'
                        >
                            Pay
                        </Button>
                    </div>
                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ mb: 2 }}>
                        <Stack justifyContent='start' >
                            <PersonPinCircleIcon color='primary' />
                            <Typography color='primary'> <b> Shipping Address </b> </Typography>
                        </Stack>
                        <Grid container alignItems='center' sx={{ mt: 2 }}>
                            <Grid xs={12} md={2} item>
                                <b> {order?.address?.name} </b>
                            </Grid>
                            <Grid xs={12} md={10} item>
                                {`${order?.address?.province} ${order?.address?.district} ${order?.address?.subDistrict} ${order?.address?.zipCode} ${order?.address?.detail}`}
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider sx={{ mb: 2 }} />
                    {
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
                            <span> Total Price : {(Number(order.totalPrice) + Number(order.deliveryPrice))?.toLocaleString()} </span>
                        </Stack>
                    </div>
                </Paper>
            </Container>
        </PageWrapper>
    )
}