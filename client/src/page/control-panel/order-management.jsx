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
import { Link } from 'react-router-dom';
import FsLightbox from 'fslightbox-react';
import { useState } from 'react';

export default function OrderManagement() {
    const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
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
                        payment confirm
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
                        shipping confirm
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
                        <b> nutella tester </b>
                    </Grid>
                    <Grid xs={12} md={10} item>
                        It depends... NASA Headquarters has two different addresses: an official mailing address and a delivery address. Using the correct address can be crucial.
                    </Grid>
                </Grid>
            </Box>

            <Divider sx={{ m: 2 }} />

            {
                new Array(3).fill(1).map(order => {
                    return (
                        <Grid key={Math.random()} spacing={2} sx={{ mb: 2 }} container alignItems='center'>
                            <Grid xs={8} item>
                                <Stack >
                                    <img className='fix-img mr-4 rounded-md w-[100px] h-[100px]' src="https://www.scotsman.com/webimg/b25lY21zOjI5YWQ2NDQzLTJjYTctNDJiZS1iMGU1LThjYTA1NWQ4Y2RjMTpmOTljNGM4Yy1kMzljLTQ5MmUtYmVjMS0zNzY2ZmUyNTYzMjg=.jpg?width=640&quality=65&smart&enable=upscale" alt="" />
                                    <Typography className='w-[calc(100%-100px)] w-full'>
                                        Royal Kludge RK68 RGB Hotswap USB HUB คีย์บอร์ดเกมมิ่งคีย์ไทย ไร้สายบลูทูธและมีสาย เปลี่ยนสวิตซ์ได้ เลเซอร์ไทย - English
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid xs={1} item></Grid>
                            <Grid xs={1} item>
                                x2
                            </Grid>
                            <Grid xs={2} item textAlign='right'>
                                1,500
                            </Grid>
                        </Grid>
                    )
                })
            }
            <Typography> Provider : Kerry Express </Typography>

            <Divider sx={{ m: 2 }} />

            <div className='text-right'>
                <span> Delivery Price : 50 </span>
                <br />
                <span> Total Price : 3,560 </span>
            </div>
        </>
    )
}