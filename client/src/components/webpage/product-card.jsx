import { Stack, Typography, Skeleton } from '@mui/material';
import { StyledProductCard } from './../../style/product.style';
import { Link } from 'react-router-dom'

const ProductCard = ({ product = {}, loading }) => {
    return (
        <StyledProductCard>
            <Link to={`${loading ? '#' : `/product/${product.category}/${product.skuId}`}`} >
                <figure className='relative w-full pt-[75%]'>
                    {
                        loading ?
                            <Skeleton className='fit-img rounded-md' />
                            :
                            <img className='fit-img rounded-md' src={`${import.meta.env.VITE_BASE_API}/${product.thumbnail}`} />
                    }
                </figure>
            </Link>
            {
                loading ?
                    <Skeleton />
                    :
                    <Typography className='line-clamp-2 font-medium my-4'>
                        {product.name}
                    </Typography>
            }
            <Stack justifyContent='space-between'>
                {
                    loading ?
                        <Skeleton width='100%' />
                        :
                        <>
                            <Typography variant='subtitle2' color='primary'>
                                <b> {`฿${product.price.toLocaleString()}`} </b>
                            </Typography>
                            <Typography variant='subtitle2'>
                                {product.category}
                            </Typography>
                        </>
                }
            </Stack>
        </StyledProductCard>
    )
}

export default ProductCard