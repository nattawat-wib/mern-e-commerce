import styled from "@emotion/styled";
import { Paper, Stack } from '@mui/material';

export const StyledProductCard = styled(Paper)`
    box-shadow: 0 0 12px rgba(0,0,0, .05);
    padding: .5rem;
`

export const StyledSnippetInput = styled(Stack)`
    justify-content: flex-start;

    & input {
        width: 50px;
        height: 31px;
        border-top: 1px solid ${({ theme }) => theme.mui.palette.primary.main+'80'};
        border-bottom: 1px solid ${({ theme }) => theme.mui.palette.primary.main+'80'};
        border-right: none;
        border-left: none;
        text-align: center;
        -moz-appearance: textfield;
        margin: 0;
        font-size: 17px;
        font-weight: 600;
        color: ${({ theme }) => theme.inputColor};
        background-color: ${({ theme }) => theme.inputBg};
        
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
    }

    & > button:first-of-type {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        min-width: 30px;
    }

    & > button:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        min-width: 30px;
    }
`

export const StyledCartFooter = styled(Paper)`
    border-top: 2px solid ${({theme}) => theme.mui.palette.primary.light};
    box-shadow: 0 -5px 8px 0 rgba(255, 255, 255, .15);
    position: sticky;
    bottom: 10px;
`