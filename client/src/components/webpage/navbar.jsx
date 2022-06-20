import { AppBar, Container, Box, Stack, Button, TextField, Typography, IconButton, InputAdornment, Tooltip } from '@mui/material';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { Link } from 'react-router-dom';
import { StyledSearchBar } from './../../style/navbar.style';
import RegisterDialog from './register-dialog';
import { useState } from 'react';
import { useThemeContext } from './../../context/them-context';

const Navbar = () => {
    const [member, setMember] = useState(false);
    const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
    const { isDarkTheme, setIsDarkTheme } = useThemeContext();

    return (
        <AppBar position='sticky' sx={{ bgcolor: 'primary.dark' }}>
            <RegisterDialog
                isRegisterDialogOpen={isRegisterDialogOpen}
                setIsRegisterDialogOpen={setIsRegisterDialogOpen}
            />
            <Container>
                <Box className='flex items-center justify-between pt-1' >
                    <Button
                        component={Link}
                        to='/'
                        variant='text'
                        size='small'
                        sx={{ color: 'light' }}
                    >
                        control panel
                    </Button>

                    {
                        member ?
                            <Stack>
                                <Tooltip title='see your profile' arrow>
                                    <Button
                                        size='small'
                                        sx={{ color: 'light' }}
                                    >
                                        nutella tester
                                    </Button>
                                </Tooltip>
                                <Button
                                    onClick={() => setMember(prev => !prev)}
                                    size='small'
                                    sx={{ color: 'light' }}
                                >
                                    logout
                                </Button>
                            </Stack>
                            :
                            <Stack>
                                <Button
                                    size='small'
                                    sx={{ color: 'light' }}
                                >
                                    register
                                </Button>
                                <Button
                                    onClick={() => setIsRegisterDialogOpen(true)}
                                    size='small'
                                    sx={{ color: 'light' }}
                                >
                                    login
                                </Button>
                            </Stack>
                    }
                </Box>

                <Stack justifyContent='space-between' spacing={1} className='pb-1' >
                    <Stack component={Link} to='/'>
                        <img src="/image/favicon.png" alt="" width={60} height={60} />
                        <Typography sx={{ mt: 1 }} variant='h5' color='light'> Shobhee </Typography>
                    </Stack>
                    <StyledSearchBar
                        size='small'
                        variant='filled'
                        label='search'
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <Button
                                        size='small'
                                        variant='contained'
                                    >
                                        <SearchIcon color='light' />
                                    </Button>
                                </InputAdornment>
                            )
                        }}
                    />
                    <div>
                        <IconButton
                        sx={{ color: 'light' }}
                            onClick={() => setIsDarkTheme(prev => !prev)}
                        >
                            {
                                isDarkTheme ?
                                    <DarkModeIcon color='light' />
                                    :
                                    <Brightness4Icon color='light' />
                            }
                        </IconButton>

                        <IconButton sx={{ color: 'light' }}>
                            <ShoppingCartOutlinedIcon />
                        </IconButton>

                    </div>
                </Stack>
            </Container>
        </AppBar >
    )
}

export default Navbar