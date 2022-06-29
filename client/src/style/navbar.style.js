import styled from '@emotion/styled';
import { AppBar, Drawer, TextField, Autocomplete } from '@mui/material';

export const StyledSearchBar = styled(Autocomplete)`
    background-color: ${({ theme }) => theme.inputBg};
    border-radius: 4px;
    max-width: 700px;
`

export const StyledControlPanelNavbar = styled(AppBar)`
    width: calc(100% - ${({ open }) => open ? '200px' : '60px'});
    background: #121212 !important;
    margin-left: auto;
    transition: .3s ease;
`

export const StyledControlPanelSidebar = styled(Drawer)`

    & .MuiPaper-root {
        box-shadow: 0 0 24px rgba(0, 0, 0, .2);
        background-color: ${({ theme }) => theme.sidebarBg};
        color: ${({ theme }) => theme.sidebarTextColor};
        overflow: hidden;
        width: ${({ open }) => open ? '200px' : '60px'};
        transition: .3s ease;
    }

    & .MuiSvgIcon-root {
        color: ${({ theme }) => theme.sidebarTextColor};
    }
`