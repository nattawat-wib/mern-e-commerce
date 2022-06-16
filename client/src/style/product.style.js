import styled from "@emotion/styled";
import { Paper, Stack } from '@mui/material';

export const StyledProductCard = styled(Paper)`
    box-shadow: 0 0 12px rgba(0,0,0, .05);
    padding: .5rem;
`

export const StyledSnippetInput = styled(Stack)`
    & input {
        width: 50px;
        height: 31px;
        border-top: 1px solid ${({ theme }) => theme.mui.palette.primary.main};
        border-bottom: 1px solid ${({ theme }) => theme.mui.palette.primary.main};
        border-right: none;
        border-left: none;
        text-align: center;
        -moz-appearance: textfield;
        margin: 0;
        font-size: 17px;
        font-weight: 600;
        
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
    }

    & > button:first-of-type {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        width: 25px;
    }

    & > button:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        width: 25px;
    }
`