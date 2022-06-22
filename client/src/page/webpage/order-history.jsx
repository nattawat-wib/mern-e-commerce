import { Divider, Paper, Container, Typography, Stack, Grid, Button } from '@mui/material';
import { Box } from '@mui/system';
import { PageWrapper } from '../../style/util.style';

export default function OrderHistory() {
    return (
        <PageWrapper>
            <Container sx={{ py: 4 }}>
                {
                    new Array(5).fill(1).map(order => {
                        return (
                            <Paper key={Math.random()} sx={{ p: 2, mb: 4 }}>
                                <Stack justifyContent='space-between'>
                                    <Typography > Order Id : {Math.random()} </Typography>
                                    <Typography color='success.main'> <b> Success </b> </Typography>
                                </Stack>
                                <Divider sx={{ my: 2 }} />
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
                                <Box textAlign='right' className='font-bold' >
                                    <span> Delivery Price : 50 </span>
                                    <br/>
                                    <span> Total Price : 3,560 </span>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <Stack justifyContent='end' spacing={2}>
                                    <Button
                                        variant='outlined'
                                    >
                                        More Info
                                    </Button>
                                    <Button
                                        variant='contained'
                                    >
                                        Pay
                                    </Button>
                                </Stack>
                            </Paper>
                        )
                    })
                }
            </Container>
        </PageWrapper>
    )
}