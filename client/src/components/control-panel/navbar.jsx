import { Box, Stack, IconButton, Button, Container } from '@mui/material';
import { useThemeContext } from './../../context/them-context';
import { StyledControlPanelNavbar } from './../../style/navbar.style';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
    const { isDarkTheme, setIsDarkTheme } = useThemeContext();

    return (
        <StyledControlPanelNavbar open={isSidebarOpen} sx={{ py: 1, px: 2 }} position='static'>
            <Stack justifyContent='space-between'>
                <Box>
                    <IconButton onClick={() => setIsSidebarOpen(prev => !prev)} sx={{ color: 'light' }} >
                        { isSidebarOpen ? <CloseIcon /> : <MenuIcon /> }
                    </IconButton>
                    <b> Control Panel </b>
                </Box>
                <Box>
                    <IconButton
                        sx={{ color: 'light' }}
                        onClick={() => setIsDarkTheme(prev => !prev)}
                    >
                        {
                            isDarkTheme ?
                                <DarkModeIcon />
                                :
                                <Brightness4Icon />
                        }
                    </IconButton>
                    <Button
                        variant='outlined'
                        color='secondary'
                        size='small'
                    >
                        Logout
                    </Button>
                </Box>
            </Stack>
        </StyledControlPanelNavbar>
    )
}