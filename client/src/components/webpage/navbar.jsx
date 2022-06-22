import { AppBar, Container, Box, Stack, Button, Typography, IconButton, InputAdornment, Tooltip, Menu, MenuItem, Avatar, ListItemIcon } from '@mui/material';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LogoutIcon from '@mui/icons-material/Logout';
import PaymentIcon from '@mui/icons-material/Payment';

import { Link } from 'react-router-dom';
import { StyledSearchBar } from './../../style/navbar.style';
import RegisterDialog from './register-dialog';
import LoginDialog from './login-dialog';
import { useState } from 'react';
import { useThemeContext } from './../../context/them-context';
import DialogConfirm from './../util/dialog-confirm';

const Navbar = () => {
    const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [ProfileMenuParent, setProfileMenuParent] = useState(null);

    const [member, setMember] = useState(true);
    const { isDarkTheme, setIsDarkTheme } = useThemeContext();

    const handleLogout = () => {
        setMember(false)
        setIsConfirmDialogOpen(false)
        alert('logout successfully')
    }

    return (
        <AppBar position='sticky' sx={{ bgcolor: 'primary.dark' }}>
            <DialogConfirm
                isOpen={isConfirmDialogOpen}
                setIsOpen={setIsConfirmDialogOpen}
                callback={handleLogout}
            />
            <RegisterDialog
                isRegisterDialogOpen={isRegisterDialogOpen}
                setIsRegisterDialogOpen={setIsRegisterDialogOpen}
                setIsLoginDialogOpen={setIsLoginDialogOpen}
            />
            <LoginDialog
                isLoginDialogOpen={isLoginDialogOpen}
                setIsLoginDialogOpen={setIsLoginDialogOpen}
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
                                        onClick={e => setProfileMenuParent(e.target)}
                                        size='small'
                                        sx={{ color: 'light' }}
                                    >
                                        <Avatar sx={{ width: 20, height: 20, mr: 1 }} />
                                        nutella tester
                                    </Button>
                                </Tooltip>
                                <Menu
                                    open={!!ProfileMenuParent}
                                    onClose={() => setProfileMenuParent(null)}
                                    anchorEl={ProfileMenuParent}
                                >
                                    <MenuItem
                                        component={Link}
                                        to='/member'
                                        dense={true}
                                        onClick={() => setProfileMenuParent(null)}
                                    >
                                        <ListItemIcon>  <AccountBoxIcon /> </ListItemIcon>
                                        User Account
                                    </MenuItem>
                                    <MenuItem
                                        component={Link}
                                        to='/order-history'
                                        dense={true}
                                        onClick={() => setProfileMenuParent(null)}
                                    >
                                        <ListItemIcon> <PaymentIcon /> </ListItemIcon>
                                        Order History
                                    </MenuItem>
                                    <MenuItem dense={true} onClick={() => setIsConfirmDialogOpen(true)} >
                                        <ListItemIcon> <LogoutIcon /> </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                                <Button
                                    onClick={() => setIsConfirmDialogOpen(true)}
                                    size='small'
                                    sx={{ color: 'light' }}
                                >
                                    logout
                                </Button>
                            </Stack>
                            :
                            <Stack>
                                <Button
                                    onClick={() => setIsRegisterDialogOpen(true)}
                                    size='small'
                                    sx={{ color: 'light' }}
                                >
                                    register
                                </Button>
                                <Button
                                    onClick={() => setIsLoginDialogOpen(true)}
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

                        <IconButton
                            component={Link}
                            to='/cart'
                            sx={{ color: 'light' }}
                        >
                            <ShoppingCartOutlinedIcon />
                        </IconButton>

                    </div>
                </Stack>
            </Container>
        </AppBar >
    )
}

export default Navbar