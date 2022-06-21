import { Grid, Container, Paper, Typography, Rating, Stack, Button, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import RemoveIcon from '@mui/icons-material/Remove';

import { useState } from 'react';
import { PageWrapper } from './../../style/util.style';
import { StyledSnippetInput } from './../../style/product.style';
import ReviewItem from './../../components/webpage/review-item';
import ProductCard from './../../components/webpage/product-card';
import SnipperInput from '../../components/util/snippet-input';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetail = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
    };
    // const [quantity, setQuantity] = useState(0);
    const [sliderList, setSliderList] = useState([]);

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const handleQuantity = e => {
        setQuantity()
    }
    console.log('thumbsSwiper', thumbsSwiper);
    return (
        <PageWrapper>
            <Container sx={{ py: 6 }} >
                <Paper sx={{ p: 4 }} elevation={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={5} >
                            <Swiper
                                modules={[Thumbs]}
                                thumbs={{ swiper: thumbsSwiper }}
                                effect='fade'
                            >
                                {
                                    new Array(10).fill(1).map(number => {
                                        return (
                                            <SwiperSlide key={Math.random()}>
                                                <figure className='relative pt-[75%]'>
                                                    <img className='fit-img' src="https://figopetinsurance.com/sites/default/files/styles/blog_detail/public/imagedogpug-standing-leavesblog.jpg" alt="" />
                                                </figure>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                            <Swiper
                                navigation={true}
                                slideNextClass={'opacity-50'}
                                slidesPerView={5}
                                modules={[Navigation, Thumbs]}
                                onSwiper={setThumbsSwiper}
                                watchSlidesProgress={true}
                                style={{
                                    "--swiper-navigation-color": "#fff",
                                  }}                                
                            >
                                {
                                    new Array(10).fill(1).map(number => {
                                        return (
                                            <SwiperSlide key={Math.random()}>
                                                <figure className='relative pt-[75%]'>
                                                    <img className='fit-img' src="https://figopetinsurance.com/sites/default/files/styles/blog_detail/public/imagedogpug-standing-leavesblog.jpg" alt="" />
                                                </figure>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </Grid>
                        <Grid item xs={12} md={7} >
                            <Typography variant='h6'>
                                สูตรใหม่ Lancome Advanced Genifique Youth Activating Concentrate 30ml, 50ml, 100ml..
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
                                ฿1,555
                            </Typography>

                            <Grid container spacing={2} sx={{ mt: 2 }} >
                                <Grid item xs={3}>
                                    <Typography variant='caption' className='font-bold whitespace-nowrap'>
                                        Active Provider :
                                    </Typography>

                                </Grid>
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
                                <SnipperInput />
                                {/* <StyledSnippetInput>
                                    <Button
                                        onClick={() => setQuantity(prev => prev - 1)}
                                        variant='outlined'
                                        size='small'
                                    >
                                        -
                                    </Button>
                                    <input
                                        value={quantity}
                                        type='number'
                                        readOnly
                                    />
                                    <Button
                                        onClick={() => setQuantity(prev => prev + 1)}
                                        variant='outlined'
                                        size='small'
                                    >
                                        +
                                    </Button>
                                </StyledSnippetInput> */}
                            </Grid>

                            <Stack justifyContent='start' spacing={2} sx={{ mt: 4 }}>
                                <LoadingButton
                                    // loading
                                    // loadingPosition='start'
                                    startIcon={<ShoppingCartCheckoutIcon />}
                                    variant='outlined'
                                >
                                    ADD TO CART
                                </LoadingButton>
                                <Button variant='contained'> BUY NOW </Button>
                            </Stack>

                        </Grid>
                    </Grid>
                </Paper>

                <Paper sx={{ my: 4, p: 4 }}>
                    <Typography variant='h5' color='primary' sx={{ mb: 2 }}> Detail </Typography>
                    <article>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        <br />
                        <br />
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        <br />
                        <br />
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </article>
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
                        <Grid xs={12} sm={6} md={3} item > <ProductCard /> </Grid>
                        <Grid xs={12} sm={6} md={3} item > <ProductCard /> </Grid>
                        <Grid xs={12} sm={6} md={3} item > <ProductCard /> </Grid>
                        <Grid xs={12} sm={6} md={3} item > <ProductCard /> </Grid>
                    </Grid>
                </Paper>
            </Container>
        </PageWrapper >
    )
}

export default ProductDetail