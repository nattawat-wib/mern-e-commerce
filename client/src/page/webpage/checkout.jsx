import { Container, Paper, Button, Typography, TextField, IconButton, Stack, Box, Grid, MenuItem, RadioGroup, FormLabel, FormControlLabel, Radio, Skeleton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import DeleteIcon from '@mui/icons-material/Delete';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { PageWrapper } from "../../style/util.style";
import { Link, useNavigate } from 'react-router-dom';
import { StyledCartFooter } from './../../style/product.style';
import { useState, useEffect } from 'react';
import axios from './../../api/axios';
import { useAuthContext } from './../../context/auth-context';
import providerList from './../../data/provider.json';
import DialogConfirm from './../../components/util/dialog-confirm';
import { useToggleContext } from './../../context/toggle-context';

const Checkout = () => {
    const [productList, setProductList] = useState([]);
    const [currentAddress, setCurrentAddress] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [isDialogConfirmOpen, setIsDialogConfirmOpen] = useState(false);

    const [selectProvider, setSelectProvider] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [deliveryPrice, setDeliveryPrice] = useState(' - ');
    const [form, setForm] = useState();

    const navigate = useNavigate();
    const { auth } = useAuthContext();
    const { setNavCartItem } = useToggleContext()

    useEffect(() => {
        axios('get', '/cart', null, resp => {
            setProductList(resp.data.cart)
        }, null, false, [setIsPageLoading])
    }, [])

    useEffect(() => {
        setCurrentAddress(auth?.member?.addressDefault);

        setForm({
            owner: auth?.member?._id,
            address: {
                name: auth?.member?.addressDefault?.name,
                tel: auth?.member?.addressDefault?.tel,
                province: auth?.member?.addressDefault?.province,
                district: auth?.member?.addressDefault?.district,
                subDistrict: auth?.member?.addressDefault?.subDistrict,
                zipCode: auth?.member?.addressDefault?.zipCode,
                detail: auth?.member?.addressDefault?.detail,
            },
            productList: productList.productList,
            totalProduct: productList.totalProduct,
            totalPrice: productList.totalPrice,
            provider: selectProvider,
            paymentMethod: paymentMethod,
            deliveryPrice: deliveryPrice,
        })
    }, [auth, selectProvider, productList, paymentMethod])

    const handleOrderConfirm = () => {
        console.log(form);
        axios('post', '/order', form, resp => {
            navigate(`/order/${resp.data.order.orderNumber}`);
            setNavCartItem(0)
        }, null, true, [setIsLoading])
    }

    return (
        <PageWrapper >
            <DialogConfirm
                isOpen={isDialogConfirmOpen}
                setIsOpen={setIsDialogConfirmOpen}
                callback={handleOrderConfirm}
            />
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
                    <Grid container alignItems='center' spacing={2} sx={{ mt: 2 }}>
                        <Grid xs={12} md={2} item>
                            <b> {isPageLoading ? <Skeleton /> : currentAddress?.name} </b>
                        </Grid>
                        <Grid xs={12} md={8} item>
                            {
                                isPageLoading ?
                                    <Skeleton />
                                    :
                                    !currentAddress ?
                                        <Typography textAlign='center'> "no have any default address, <br /> please select default address before order" </Typography>
                                        :
                                        `${currentAddress?.province} ${currentAddress?.district} ${currentAddress?.subDistrict} ${currentAddress?.zipCode} ${currentAddress?.detail}`
                            }

                        </Grid>
                        <Grid xs={12} md={2} item>
                            <Button
                                disabled
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
                        isPageLoading ?
                            new Array(3).fill(1).map((item, i) => {
                                return (
                                    <Grid key={i} container alignItems='center' spacing={2}>
                                        <Grid xs={12} md={6} item>
                                            <Stack alignItems='center' justifyContent='start' spacing={2}>
                                                <Skeleton width={100} height={100} />
                                                <div className='w-full'>
                                                    <Skeleton width={'100%'} />
                                                    <Skeleton width={'100%'} />
                                                    <Skeleton width={'100%'} />
                                                </div>
                                            </Stack>
                                        </Grid>
                                        <Grid xs={12} md={2} item>
                                            <Skeleton />
                                        </Grid>
                                        <Grid xs={12} md={2} item>
                                            <Skeleton />
                                        </Grid>
                                        <Grid xs={12} md={2} item>
                                            <Skeleton />
                                        </Grid>
                                    </Grid>
                                )
                            })
                            :
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
                        <Grid xs={5} item>
                            <TextField
                                onChange={e => setSelectProvider(e.target.value)}
                                value={selectProvider}
                                label='provider'
                                select
                                fullWidth
                                size='small'
                            >
                                {
                                    providerList.map(provider => {
                                        return (
                                            <MenuItem
                                                onClick={() => setDeliveryPrice(provider.price)}
                                                value={provider.name}
                                                key={provider.name}
                                            >
                                                price {provider.price === 0 ? 'Free' : provider.price} - {provider.name}
                                            </MenuItem>)
                                    })
                                }
                            </TextField>
                        </Grid>
                        <Grid xs={1} item></Grid>
                        <Grid xs={3} item>
                            <FormLabel> Payment Method </FormLabel>
                            <RadioGroup onChange={e => setPaymentMethod(e.target.value)}>
                                <FormControlLabel name='paymentMethod' value='Bank Transfer' control={<Radio />} label='Bank Transfer' />
                                <FormControlLabel name='paymentMethod' disabled value='Credit Card' control={<Radio />} label='Credit Card' />
                                <FormControlLabel name='paymentMethod' disabled value='Crash On Delivery' control={<Radio />} label='Crash On Delivery' />
                            </RadioGroup>
                        </Grid>
                        <Grid xs={3} item>
                            <Box alignItems='center' className='text-right' >
                                <Typography sx={{ mb: 1 }}>
                                    <b>Total Product </b>: {productList.totalProduct?.toLocaleString()}
                                </Typography>
                                <Typography sx={{ mb: 1 }}>
                                    <b> All Price </b>: {productList.totalPrice?.toLocaleString()}
                                </Typography>
                                <Typography sx={{ mb: 1 }}>
                                    <b> Delivery Price </b>: {deliveryPrice === 0 ? 'Free' : deliveryPrice}
                                </Typography>
                                <br />
                                <LoadingButton
                                    onClick={() => setIsDialogConfirmOpen(true)}
                                    loading={isPageLoading || isLoading}
                                    variant='contained'
                                    size='small'
                                >
                                    Confirm Order
                                </LoadingButton>
                            </Box>

                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </PageWrapper >
    )
}

export default Checkout;