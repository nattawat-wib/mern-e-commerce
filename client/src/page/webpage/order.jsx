import { Button, Container, Divider, Paper, Stack, Typography, Grid, Step, Stepper, StepLabel } from '@mui/material';
import { PageWrapper } from './../../style/util.style';
import { StyledResponsiveStepper } from './../../style/product.style';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import PaidIcon from '@mui/icons-material/Paid';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import { Link } from 'react-router-dom';
import { StyledStepIcon } from './../../style/product.style';

export default function Order() {
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
                        <Typography > Order Id : {Math.random()} </Typography>
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

                    <Paper sx={{ mb: 2 }}>
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
                    </Paper>

                    <Divider sx={{ mb: 2 }} />
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
                    <Divider sx={{ my: 2 }} />
                    <div className='text-right'>
                        <span> Delivery Price : 50 </span>
                        <br />
                        <span> Total Price : 3,560 </span>
                    </div>
                </Paper>
            </Container>
        </PageWrapper>
    )
}