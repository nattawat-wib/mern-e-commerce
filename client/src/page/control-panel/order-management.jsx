import { Divider, Grid, Typography, Step, StepLabel, Stack, Button, Box, Paper } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import PaidIcon from '@mui/icons-material/Paid';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import { StyledResponsiveStepper } from '../../style/product.style';
import { StyledStepIcon } from '../../style/product.style';
import { Link, useParams } from 'react-router-dom';
import FsLightbox from 'fslightbox-react';
import { useState, useEffect } from 'react';
import axios from '../../api/axios';

export default function OrderManagement() {
    const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
    const { orderNumber } = useParams();
    const [order, setOrder] = useState({});

    useEffect(() => {
        axios('get', `/order/${orderNumber}`, null, resp => {
            console.log(resp.data.order);
            setOrder(resp.data.order)
        }, null, false)
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
        <>
            <FsLightbox
                toggler={isLightBoxOpen}
                sources={['/image/favicon.png']}
            />
            <Stack justifyContent='space-between'>
                <Typography variant='h6'> Order Management </Typography>
                <Button
                    component={Link}
                    to='/cp/order'
                    variant='outlined'
                    startIcon={<ArrowCircleLeftOutlinedIcon />}
                >
                    Back to Order
                </Button>
            </Stack>

            <Divider sx={{ m: 2 }} />

            <Grid spacing={2} container>
                <Grid xs={12} md={6} item>
                    <b> payment confirm  </b>
                    <Grid container spacing={2} sx={{ pl: 3, pt: 2 }}>
                        <Grid xs={4} item textAlign='right'> payment date/time : </Grid>
                        <Grid xs={8} item> 10/02/2022 18:13 </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ pl: 3, pt: 2 }}>
                        <Grid xs={4} item textAlign='right'> transfer to : </Grid>
                        <Grid xs={8} item> Kasikorn Thai </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ pl: 3, pt: 2 }}>
                        <Grid xs={4} item textAlign='right'> amounth : </Grid>
                        <Grid xs={8} item> 3,500 </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ pl: 3, pt: 2 }}>
                        <Grid xs={4} item textAlign='right'> slip upload : </Grid>
                        <Grid xs={8} item>
                            <Button onClick={() => setIsLightBoxOpen(prev => !prev)} >
                                <img
                                    className='fix-img'
                                    src='https://via.placeholder.com/500'
                                    width={100}
                                    height={100}
                                />
                            </Button>
                        </Grid>
                    </Grid>
                    <LoadingButton
                        // loading={true}
                        className='block ml-auto mt-4'
                        size='small'
                        variant='contained'
                    >
                        confirm payment
                    </LoadingButton>
                </Grid>

                <Grid xs={12} md={6} item>
                    <b> shipping confirm </b>
                    <Grid container spacing={2} sx={{ pl: 3, pt: 2 }}>
                        <Grid xs={4} item textAlign='right'> payment date/time : </Grid>
                        <Grid xs={8} item> 10/02/2022 18:13 </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ pl: 3, pt: 2 }}>
                        <Grid xs={4} item textAlign='right'> transfer to : </Grid>
                        <Grid xs={8} item> Kasikorn Thai </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ pl: 3, pt: 2 }}>
                        <Grid xs={4} item textAlign='right'> amounth : </Grid>
                        <Grid xs={8} item> 3,500 </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ pl: 3, pt: 2 }}>
                        <Grid xs={4} item textAlign='right'> slip upload : </Grid>
                        <Grid xs={8} item> 3,500 </Grid>
                    </Grid>
                    <LoadingButton
                        // loading={true}
                        className='block ml-auto mt-4'
                        size='small'
                        variant='contained'
                    >
                        confirm shipping
                    </LoadingButton>
                </Grid>
            </Grid>

            <Divider sx={{ m: 2 }} />

            <StyledResponsiveStepper activeStep={0} alternativeLabel  >
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

            <Divider sx={{ m: 2 }} />

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

            <Divider sx={{ m: 2 }} />
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
        </>
    )
}