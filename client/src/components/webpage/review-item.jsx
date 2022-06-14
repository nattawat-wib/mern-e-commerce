import { Stack, Rating, Typography, Avatar, Box } from '@mui/material';

const ReviewItem = () => {
    return (
        <Stack alignItems='start' spacing={2} className='mb-8' >
            <Avatar src='' sx={{ width: 30, height: 30, mt: 1 }} />
            <Box className='w-full' >
                <Typography className='font-bold'> nutella tester </Typography>
                <Rating defaultValue={2} readOnly />
                <Typography variant='body2' className='text-xs mb-2'> 2022/03/24 14:00 </Typography>
                <article>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                </article>
            </Box>
        </Stack>
    )
}

export default ReviewItem