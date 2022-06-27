import { Grid, Container } from '@mui/material';

import { PageWrapper } from './../../style/util.style';
import ProductCard from '../../components/webpage/product-card';
import { useState, useEffect } from 'react';
import axios from './../../api/axios';

export default function Index() {
    const [productList, setProductList] = useState([]);
    const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);

    useEffect(() => {
        setIsSkeletonLoading(true);

        axios('get', '/product', null, resp => {
            // console.log(resp);
            setProductList(resp.data.product)
            setIsSkeletonLoading(false)
        },
            null, false, [])
    }, [])

    return (
        <PageWrapper>
            <Container sx={{ py: 6 }} >
                <Grid container spacing={3}>
                    {
                        isSkeletonLoading ?
                            new Array(8).fill(1).map(product => {
                                return (
                                    <Grid item xs={12} sm={6} md={3} key={Math.random()} >
                                        {<ProductCard loading={isSkeletonLoading} />}
                                    </Grid>
                                )
                            })
                            :
                            productList.map(product => {
                                return (
                                    <Grid item xs={12} sm={6} md={3} key={product.skuId} >
                                        {<ProductCard product={product} />}
                                    </Grid>
                                )
                            })
                    }
                </Grid>
            </Container>
        </PageWrapper>
    )
}