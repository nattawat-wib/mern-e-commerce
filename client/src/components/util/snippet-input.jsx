import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { useEffect, useState } from 'react';
import { StyledSnippetInput } from './../../style/product.style';
import axios from './../../api/axios';
import { useToggleContext } from './../../context/toggle-context';

const SnippetInput = ({ skuId, value = 1, setValue, loading = false, setReRenderCart }) => {
    const [quantity, setQuantity] = useState(value);
    const [isLoading, setIsLoading] = useState(loading);
    const { setNavCartItem } = useToggleContext();

    if (setValue) {
        useEffect(() => setValue(quantity), [quantity]);
        useEffect(() => setIsLoading(loading), [loading]);
    } else {
        ///
    }

    const handleCartItem = action => {
        axios('patch', `/cart/${skuId}/${quantity}`, { action }, resp => {
            setReRenderCart(Date.now)
            setNavCartItem(resp.data.cart.totalProduct)
        }, null, false, [setIsLoading])
    }

    return (
        <StyledSnippetInput loading={isLoading.toString()}>
            <LoadingButton
                loading={isLoading}
                onClick={() => setQuantity(prev => {
                    if ((prev - 1) < 1) {
                        return prev
                    } else {
                        if(!setValue) handleCartItem('decrease')
                        return prev - 1
                    }
                })}
                variant='outlined'
                size='small'
            >
                <RemoveIcon />
            </LoadingButton>
            <input
                disabled={true}
                // disabled={isLoading}
                value={quantity}
                // onChange={e => {
                //     setQuantity(+e.target.value)
                //     handleCartItem('change')
                // }}
                // onKeyUp={e => setQuantity(() => +e.target.value < 1 ? setQuantity(1) : setQuantity(+e.target.value))}
                type='number'
            />
            <LoadingButton
                loading={isLoading}
                onClick={() => {
                    if(!setValue) handleCartItem('increase')                    
                    setQuantity(prev => prev + 1)
                }}
                variant='outlined'
                size='small'
            >
                <AddIcon />
            </LoadingButton>
        </StyledSnippetInput>
    )
}

export default SnippetInput