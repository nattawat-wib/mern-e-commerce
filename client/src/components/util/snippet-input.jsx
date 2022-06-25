import { StyledSnippetInput } from './../../style/product.style';
import { useState } from 'react';
import { Button } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const SnippetInput = () => {
    const [quantity, setQuantity] = useState(0);

    return (
        <StyledSnippetInput>
            <Button
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
                <AddIcon />
            </Button>
        </StyledSnippetInput>
    )
}

export default SnippetInput