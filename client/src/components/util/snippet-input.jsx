import { StyledSnippetInput } from './../../style/product.style';
import { useState } from 'react';
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect } from 'react';

const SnippetInput = ({ useApiHere, skuId, value = 1, setValue, loading = false }) => {
    const [quantity, setQuantity] = useState(value);
    const [isLoading, setIsLoading] = useState(loading);

    if(!useApiHere) {
        useEffect(() => setValue(quantity), [quantity]);
        useEffect(() => setIsLoading(loading), [loading]);
    } else {
        ///
    }

    return (
        <StyledSnippetInput loading={isLoading.toString()}>
            <LoadingButton
                loading={isLoading}
                onClick={() => setQuantity(prev => {
                    if ((prev - 1) < 1) {
                        return prev
                    } else {
                        return prev - 1
                    }
                })}
                variant='outlined'
                size='small'
            >
                <RemoveIcon />
            </LoadingButton>
            <input
                disabled={isLoading}
                value={quantity}
                onChange={e => setQuantity(+e.target.value)}
                onKeyUp={e => setQuantity(() => +e.target.value < 1 ? setQuantity(1) : setQuantity(+e.target.value) )}
                type='number'
            />
            <LoadingButton
                loading={isLoading}
                onClick={() => setQuantity(prev => prev + 1)}
                variant='outlined'
                size='small'
            >
                <AddIcon />
            </LoadingButton>
        </StyledSnippetInput>
    )
}

export default SnippetInput