import { Divider, Grid, Typography, Step, StepLabel, Stack, Button, Box, Paper, TextField, MenuItem } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import PaidIcon from '@mui/icons-material/Paid';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import { StyledResponsiveStepper, StyledStepIcon } from '../../style/product.style';
import { Link, useParams } from 'react-router-dom';
import FsLightbox from 'fslightbox-react';
import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import DialogConfirm from '../../components/util/dialog-confirm';
import providerList from './../../data/provider.json';

export default function OrderManagement() {
    const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
    const { orderNumber } = useParams();
    const [order, setOrder] = useState({});
    const [shippingConfirmForm, setShippingConfirmForm] = useState({});

    const [isDialogConfirmPaymentOpen, setIsDialogConfirmPaymentOpen] = useState(false);
    const [isDialogConfirmShippingOpen, setIsDialogConfirmShippingOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const checkoutStatus = {
        'waiting for payment': 0,
        'waiting for review': 0,
        'waiting for shipping': 1,
        'success': 2,
    };

    // console.log(order);
    // console.log(order.paymentConfirmAt);

    useEffect(() => {
        axios('get', `/order/${orderNumber}`, null, resp => {
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

    const handleConfirmPayment = () => {
        axios('patch', `/order/confirm-payment/${orderNumber}`, null, resp => {
            setOrder(resp.data.order)
        }, null, true, [setIsLoading])
    }

    const handleShippingConfirmFormChange = e => {
        setShippingConfirmForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleConfirmShipping = () => {
        axios('patch', `/order/confirm-shipping/${orderNumber}`, shippingConfirmForm, resp => {
            setOrder(resp.data.order)
        }, null, true, [setIsLoading])
    }

    return (
        <>
            <DialogConfirm
                isOpen={isDialogConfirmPaymentOpen}
                setIsOpen={setIsDialogConfirmPaymentOpen}
                callback={handleConfirmPayment}
            />
            <DialogConfirm
                isOpen={isDialogConfirmShippingOpen}
                setIsOpen={setIsDialogConfirmShippingOpen}
                callback={handleConfirmShipping}
            />
            <FsLightbox
                toggler={isLightBoxOpen}
                sources={[<img src={`${import.meta.env.VITE_BASE_API}/${order?.transaction?.slip}`} />]}
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
            <Typography color='primary'> <b> status : {order.status} </b> </Typography>
            <br />
            <Grid spacing={2} container>
                <Grid xs={12} md={6} item>
                    <b> payment confirm  </b>
                    <Grid container spacing={2} sx={{ pl: 3, pt: 2 }}>
                        <Grid xs={4} item textAlign='right'> upload at : </Grid>
                        <Grid xs={8} item> {order?.transaction ? order.transaction.dateTime : '-'} </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems='center' sx={{ pl: 3, pt: 2 }}>
                        <Grid xs={4} item textAlign='right'> transfer to : </Grid>
                        <Grid xs={8} item>
                            <Stack justifyContent='flex-start' alignItems='center' spacing={3}>
                                {order?.transaction ?
                                    <>
                                        <img src={`/image/bank-order-eng/${order.transaction.transferTo}.png`} width={30} height={30} style={{ marginRight: 10 }} />
                                        {order.transaction.transferTo}
                                    </>
                                    :
                                    '-'
                                }
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ pl: 3, pt: 2 }}>
                        <Grid xs={4} item textAlign='right'> balance : </Grid>
                        <Grid xs={8} item> {order?.transaction ? order.transaction.balance.toLocaleString() : '-'} </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ pl: 3, pt: 2 }}>
                        <Grid xs={4} item textAlign='right'> slip upload : </Grid>
                        <Grid xs={8} item>
                            {
                                order?.transaction ?
                                    <Button onClick={() => setIsLightBoxOpen(prev => !prev)}>
                                        <img
                                            className='fix-img'
                                            src={order?.transaction ? `${import.meta.env.VITE_BASE_API}/${order.transaction.slip}` : 'https://via.placeholder.com/500'}
                                            width={100}
                                            height={100}
                                        />
                                    </Button>
                                    :
                                    '-'
                            }
                        </Grid>
                    </Grid>
                    <LoadingButton
                        loading={isLoading}
                        onClick={() => setIsDialogConfirmPaymentOpen(true)}
                        disabled={order.status !== 'waiting for review'}
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
                        <Grid xs={4} item textAlign='right'> confirm at </Grid>
                        <Grid xs={8} item> {order.shippingConfirmADateTime || '-'} </Grid>
                    </Grid>
                    <Grid container alignItems='center' spacing={2} sx={{ pl: 3, pt: 2 }}>
                        <Grid xs={4} item textAlign='right'> provider : </Grid>
                        <Grid xs={8} item>
                            <TextField
                                onChange={handleShippingConfirmFormChange}
                                size='small'
                                name='provider'
                                disabled={order.status !== 'waiting for shipping'}
                                value={order?.shippingDetail?.provider || shippingConfirmForm.provider || ''}
                                select
                                fullWidth
                            >
                                {
                                    providerList.map(provider => {
                                        return (
                                            <MenuItem
                                                value={provider.name}
                                                key={provider.name}
                                            >
                                                {provider.name}
                                            </MenuItem>)
                                    })
                                }
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container alignItems='center' spacing={2} sx={{ pl: 3, pt: 2 }}>
                        <Grid xs={4} item textAlign='right'> delivery price: </Grid>
                        <Grid xs={8} item>
                            <TextField
                                onChange={handleShippingConfirmFormChange}
                                size='small'
                                name='deliveryPrice'
                                disabled={order.status !== 'waiting for shipping'}
                                value={order?.shippingDetail?.deliveryPrice || shippingConfirmForm.deliveryPrice || ''}
                                type='number'
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container alignItems='center' spacing={2} sx={{ pl: 3, pt: 2 }}>
                        <Grid xs={4} item textAlign='right'> tracking id : </Grid>
                        <Grid xs={8} item>
                            <TextField
                                onChange={handleShippingConfirmFormChange}
                                size='small'
                                name='trackingId'
                                disabled={order.status !== 'waiting for shipping'}
                                value={order?.shippingDetail?.trackingId || shippingConfirmForm.trackingId || ''}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        loading={isLoading}
                        onClick={() => setIsDialogConfirmShippingOpen(true)}
                        disabled={order.status !== 'waiting for shipping'}
                        className='block ml-auto mt-4'
                        size='small'
                        variant='contained'
                    >
                        confirm shipping
                    </LoadingButton>
                </Grid>
            </Grid>

            <Divider sx={{ m: 2 }} />

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
                    <span> <b> Total Price : {(Number(order.totalPrice) + Number(order.deliveryPrice))?.toLocaleString()} </b> </span>
                </Stack>
            </div>
        </>
    )
}