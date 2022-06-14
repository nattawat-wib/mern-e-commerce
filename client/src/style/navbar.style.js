import styled from '@emotion/styled';
import { TextField } from '@mui/material';

export const StyledSearchBar = styled(TextField)`
    background-color: #fff;
    border-radius: 4px;
    padding: 0;
    max-width: 700px;
    
    & .MuiFilledInput-input {
        padding-top: 17px;
        font-size: 14px;
    }

    & label.MuiInputLabel-formControl {
        top: -4px
    }
`