import { AppBar, Container, Box, Stack, Button, Typography, IconButton, InputAdornment, Tooltip, Menu, MenuItem, Avatar, ListItemIcon, Badge, TextField } from '@mui/material';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LogoutIcon from '@mui/icons-material/Logout';
import PaymentIcon from '@mui/icons-material/Payment';

import { Link, useNavigate } from 'react-router-dom';
import { StyledSearchBar } from './../../style/navbar.style';
import RegisterDialog from './register-dialog';
import LoginDialog from './login-dialog';
import { useState, useEffect } from 'react';
import DialogConfirm from './../util/dialog-confirm';
import { useAuthContext } from '../../context/auth-context';
import { useThemeContext } from './../../context/them-context';
import { useToggleContext } from './../../context/toggle-context';
import axios from './../../api/axios';

const Navbar = () => {
    const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [profileMenuParent, setProfileMenuParent] = useState(null);

    const { isDarkTheme, setIsDarkTheme } = useThemeContext();
    const { auth, authDispatch } = useAuthContext();
    const { navCartItem } = useToggleContext();

    const [searchResultList, setSearchResultList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios('get', `/product/search/key`, null, resp => {
            setSearchResultList(resp.data.result)
        }, null, false)
    }, [])

    const handleLogout = () => {
        axios('delete', '/auth/logout', null, () => {
            authDispatch({ type: 'logout' })
            window.location.href = '/'
        }, null)
        setIsConfirmDialogOpen(false)
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
                isLoginDialogOpen={isLoginDialogOpen} s
                setIsLoginDialogOpen={setIsLoginDialogOpen}
                setIsRegisterDialogOpen={setIsRegisterDialogOpen}
            />
            <Container>
                <Box className='flex items-center justify-between pt-1' >
                    <Button
                        component={Link}
                        to='/cp'
                        variant='text'
                        size='small'
                        sx={{ color: 'light' }}
                    >
                        control panel
                    </Button>
                    {
                        auth.isAuth ?
                            <Stack>
                                <Tooltip title='see your profile' arrow>
                                    <Button
                                        onClick={e => setProfileMenuParent(e.target)}
                                        size='small'
                                        sx={{ color: 'light' }}
                                    >
                                        <Avatar
                                            src={`${import.meta.env.VITE_BASE_API}/${auth.member?.avatar}`}
                                            sx={{ width: 20, height: 20, mr: 1 }}
                                        />
                                        {auth.member.firstName}
                                    </Button>
                                </Tooltip>
                                <Menu
                                    open={!!profileMenuParent}
                                    onClose={() => setProfileMenuParent(null)}
                                    anchorEl={profileMenuParent}
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
                        <Typography sx={{ mt: 1 }} variant='h5' color='light'> Shobpee </Typography>
                    </Stack>
                    <StyledSearchBar
                        // disablePortal
                        onChange={(e, product) => {
                            if (product) navigate(`/product/${product.category}/${product.skuId}`)
                        }}
                        options={searchResultList}
                        getOptionLabel={option => option.name || ""}
                        renderInput={params => <TextField variant='filled' label='search' {...params} />}
                        size='small'
                        fullWidth
                    />
                    <div>
                        <IconButton
                            sx={{ color: 'light' }}
                            onClick={() => setIsDarkTheme(prev => !prev)}
                        >
                            {isDarkTheme ? <DarkModeIcon color='light' /> : <Brightness4Icon color='light' />}
                        </IconButton>

                        <IconButton
                            component={Link}
                            to={`${auth.isAuth ? '/cart' : '#'}`}
                            disabled={!auth.isAuth}
                            sx={{ color: 'light' }}
                        >
                            <Badge badgeContent={navCartItem} color='secondary'>
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </IconButton>

                    </div>
                </Stack>
            </Container>
        </AppBar >
    )
}

export default Navbar