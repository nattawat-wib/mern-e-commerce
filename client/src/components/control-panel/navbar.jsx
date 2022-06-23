import { Box, AppBar, Stack, IconButton, Button, Container } from '@mui/material';
import { useThemeContext } from './../../context/them-context';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
    const { isDarkTheme, setIsDarkTheme } = useThemeContext();

    return (
        <AppBar sx={{ bgcolor: 'primary.light', py: 1, px: 2 }} position='static'>
            <Stack justifyContent='space-between'>
                <Box>
                    <IconButton
                        onClick={() => setIsSidebarOpen(true)}
                        sx={{ color: 'light' }}
                    >
                        <MenuIcon />
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
        </AppBar>
    )
}