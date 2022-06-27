import { Grid, Container, Paper, Typography, Rating, Stack, Button, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import RemoveIcon from '@mui/icons-material/Remove';

import { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { PageWrapper } from './../../style/util.style';
import { StyledSnippetInput } from './../../style/product.style';
import ReviewItem from './../../components/webpage/review-item';
import ProductCard from './../../components/webpage/product-card';
import SnipperInput from '../../components/util/snippet-input';
import { useToggleContext } from '../../context/toggle-context';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from '../../api/axios';

const ProductDetail = () => {
    const [sliderList, setSliderList] = useState([]);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [currentProduct, setCurrentProduct] = useState({});
    const [otherProductList, setOtherProductList] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const [isLoading, setIsLoading] = useState(false);

    const { setNavCartItem } = useToggleContext();

    const { productSku } = useParams();
    const location = useLocation();

    useEffect(() => {
        axios('get', `/product/${productSku}`, null,
            resp => setCurrentProduct(resp.data.product), null, false
        )

        axios('get', `/product`, null,
            resp => setOtherProductList(resp.data.product), null, false
        )
    }, [location])

    const addProductToCart = () => {
        axios('patch', `/cart/${currentProduct.skuId}/${quantity}`, {}, resp => {
            console.log(resp);
            console.log(resp.data.cart.totalProduct);
            setNavCartItem(resp.data.cart.totalProduct)
        }, null, true, [setIsLoading])
    }

    return (
        <PageWrapper>
            <Container sx={{ py: 6 }} >
                <Paper sx={{ p: 4 }} elevation={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={5} >
                            <Swiper
                                modules={[Thumbs]}
                                thumbs={{ swiper: thumbsSwiper }}
                                className='mb-1'
                            >
                                {
                                    [currentProduct.thumbnail || '', ...currentProduct.imageList || ''].map(image => {
                                        return (
                                            <SwiperSlide key={image}>
                                                <figure className='relative pt-[75%]'>
                                                    <img className='fit-img' src={`${import.meta.env.VITE_BASE_API}/${image}`} />
                                                </figure>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                            <Swiper
                                navigation={true}
                                // slideNextClass={'opacity-50'}
                                slidesPerView={5}
                                spaceBetween={5}
                                modules={[Navigation, Thumbs]}
                                onSwiper={setThumbsSwiper}
                                watchSlidesProgress={true}
                                style={{
                                    "--swiper-navigation-color": "#fff",
                                }}
                            >
                                {
                                    [currentProduct.thumbnail || '', ...currentProduct.imageList || ''].map(image => {
                                        return (
                                            <SwiperSlide key={image}>
                                                <figure className='relative pt-[75%]'>
                                                    <img className='fit-img' src={`${import.meta.env.VITE_BASE_API}/${image}`} />
                                                </figure>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </Grid>
                        <Grid item xs={12} md={7} >
                            <Typography variant='h6'>
                                {currentProduct.name}
                            </Typography>
                            <Stack spacing={1} justifyContent='flex-start'>
                                <Rating name="half-rating-read" defaultValue={4.7} readOnly />
                                <Typography variant='subtitle1'>
                                    4.7
                                </Typography>
                            </Stack>

                            <Typography
                                variant='h4'
                                className='font-bold'
                                color='primary'
                                sx={{ mt: 3 }}
                            >
                                ฿{currentProduct.price?.toLocaleString()}
                            </Typography>

                            <Grid container spacing={2} sx={{ mt: 2 }} >
                                <Grid item xs={9}>
                                    <Grid container spacing={1}>
                                        <Grid xs={2} item>
                                            <img className='w-full' src="/image/prodivers-list/DHL.png" alt="" />
                                        </Grid>
                                        <Grid xs={2} item>
                                            <img className='w-full' src="/image/prodivers-list/Fed Ex.png" alt="" />
                                        </Grid>
                                        <Grid xs={2} item>
                                            <img className='w-full' src="/image/prodivers-list/Kerry Express.png" alt="" />
                                        </Grid>
                                        <Grid xs={2} item>
                                            <img className='w-full' src="/image/prodivers-list/Fed Ex.png" alt="" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ mt: 2 }} >
                                <Grid item xs={3}>
                                    <Typography variant='caption' className='font-bold whitespace-nowrap'>
                                        Quantity :
                                    </Typography>

                                </Grid>
                                <SnipperInput setValue={setQuantity} />
                            </Grid>

                            <Stack justifyContent='start' spacing={2} sx={{ mt: 4 }}>
                                <LoadingButton
                                    onClick={addProductToCart}
                                    loading={isLoading}
                                    loadingPosition='start'
                                    startIcon={<ShoppingCartCheckoutIcon />}
                                    variant='outlined'
                                >
                                    ADD TO CART
                                </LoadingButton>
                                <LoadingButton
                                    // onClick={addProductToCart}
                                    loading={isLoading}
                                    variant='contained'
                                >
                                    BUY NOW
                                </LoadingButton>
                            </Stack>

                        </Grid>
                    </Grid>
                </Paper>

                <Paper sx={{ my: 4, p: 4 }}>
                    <Typography variant='h5' color='primary' sx={{ mb: 2 }}> Detail </Typography>
                    <Typography dangerouslySetInnerHTML={{ __html: currentProduct.detail }} />
                </Paper>

                <Paper sx={{ my: 4, p: 4 }}>
                    <Typography variant='h5' color='primary' sx={{ mb: 2 }}> Rating & Review </Typography>
                    {
                        new Array(10).fill(1).map((review, i) => {
                            return (
                                <ReviewItem key={i} review={ReviewItem} />
                            )
                        })
                    }
                </Paper>

                <Paper sx={{ my: 4, p: 4 }}>
                    <Typography> Other Products </Typography>
                    <Grid container spacing={2} >
                        {
                            otherProductList.map(product => {
                                return (
                                    product.skuId !== currentProduct.skuId &&
                                    <Grid item xs={12} sm={6} md={3} key={product.skuId} >
                                        <ProductCard product={product} />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Paper>
            </Container>
        </PageWrapper >
    )
}

export default ProductDetail