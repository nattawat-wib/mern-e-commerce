import styled from '@emotion/styled';
import { AppBar, Drawer, TextField } from '@mui/material';

export const StyledSearchBar = styled(TextField)`
    background-color: ${({ theme }) => theme.inputBg};
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

export const StyledControlPanelNavbar = styled(AppBar)`
    width: calc(100% - ${({ open }) => open ? '200px' : '60px'});
    background-color: ${({theme}) => theme.muiCp.palette.primary.main};
    margin-left: auto;
    transition: .3s ease;
`

export const StyledControlPanelSidebar = styled(Drawer)`
    & .MuiPaper-root {
        background-color: ${({theme}) => theme.muiCp.palette.primary.main};
        color: ${({theme}) => theme.muiCp.palette.light};
        overflow: hidden;
        width: ${({ open }) => open ? '200px' : '60px'};
        transition: .3s ease;
    }

    & .MuiSvgIcon-root {
        color: ${({theme}) => theme.muiCp.palette.light};
    }
`