import { StyledSnippetInput } from './../../style/product.style';
import { useState } from 'react';
import { Button } from '@mui/material';

const SnippetInput = () => {
    const [quantity, setQuantity] = useState(0);

    return (
        <StyledSnippetInput>
            <Button
                onClick={() => setQuantity(prev => {
                    if((prev - 1) < 1) {
                        return prev
                    } else {
                        return prev - 1 
                    }
                })}
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
        </StyledSnippetInput>
    )
}

export default SnippetInput