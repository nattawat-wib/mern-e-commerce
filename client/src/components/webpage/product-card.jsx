import { Stack, Typography } from '@mui/material';
import { StyledProductCard } from './../../style/product.style';
import { Link } from 'react-router-dom'

const ProductCard = () => {
    return (
        <StyledProductCard>
            <Link to='/1/shirt'>
                <figure className='relative w-full pt-[75%]'>
                    <img className='fit-img rounded-md' src='https://via.placeholder.com/500' />
                </figure>
            </Link>

            <Typography align='center' className='font-medium'>
                Product Name
            </Typography>
            <Stack justifyContent='space-between'>
                <Typography variant='subtitle2' color='primary'>
                    ฿239
                </Typography>
                <Typography variant='subtitle2'>
                    sold 10
                </Typography>
            </Stack>
        </StyledProductCard>
    )
}

export default ProductCard