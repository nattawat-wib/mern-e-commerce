import styled from "@emotion/styled";
import { Paper, Stack, Stepper } from '@mui/material';
import { style } from "@mui/system";

export const StyledProductCard = styled(Paper)`
    box-shadow: 0 0 12px rgba(0,0,0, .05);
    padding: .5rem;
`

export const StyledSnippetInput = styled(Stack)`
    justify-content: flex-start;

    & input {
        width: 50px;
        height: 31px;
        border-top: 1px solid ${({ theme }) => theme.mui.palette.primary.main + '80'};
        border-bottom: 1px solid ${({ theme }) => theme.mui.palette.primary.main + '80'};
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
    border-top: 2px solid ${({ theme }) => theme.mui.palette.primary.light};
    box-shadow: 0 -5px 8px 0 rgba(255, 255, 255, .15);
    position: sticky;
    bottom: 10px;
`

export const StyledResponsiveStepper = styled(Stepper)`
    & .MuiStepConnector-root {
        left: calc(-50% + 33px);
        right: calc(50% + 33px);

        & .MuiStepConnector-line {
            min-height: 20px;
            margin-top: 12px;
            border-width: 3px;
        }

        &.Mui-completed > .MuiStepConnector-line, 
        &.Mui-active > .MuiStepConnector-line {
            border-color: ${({ theme }) => theme.mui.palette.primary.main} ;       
        }        
    }

    @media(max-width: 576px) {
        flex-direction: column;
        align-items: center;
        
        & .MuiStepLabel-alternativeLabel {
            flex-direction: row !important;
            margin: 5px 10px;
        }

        & .MuiStepConnector-root {
            position: static;

            & .MuiStepConnector-line {
                min-height: 30px;
                border: none;
                margin-left: 43px;
                margin-top: 0;
                border-left-style: solid;
                border-left-width: 3px;
            }
        }
    }
`

export const StyledStepIcon = styled.div`
    width: 50px;
    height: 50px;
    color: #fff;
    background-color: ${prop => {
        return (prop.status.active || prop.status.completed) ?
            prop.theme.mui.palette.primary.main
            :
            '#adadad';
    }};
    border-radius: 99px;
    display: flex;
    align-items: center;
    justify-content: center;
` 