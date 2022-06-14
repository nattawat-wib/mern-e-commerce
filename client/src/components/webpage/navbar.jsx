import { AppBar, Container, Box, Stack, Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';

import { Link } from 'react-router-dom';
import { StyledSearchBar } from './../../style/navbar.style';

const Navbar = () => {
    return (
        <AppBar position='sticky' sx={{ bgcolor: 'primary.dark' }}>
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

                    <Stack>
                        <Button
                            component={Link}
                            to='/'
                            variant='text'
                            size='small'
                            sx={{ color: 'light' }}
                        >
                            register
                        </Button>
                        <Button
                            component={Link}
                            to='/'
                            variant='text'
                            size='small'
                            sx={{ color: 'light' }}
                        >
                            login
                        </Button>
                    </Stack>
                </Box>

                <Stack justifyContent='space-between' spacing={1} className='pb-1' >
                    <Stack component={Link} to='/'>
                        <img src="/image/favicon.png" alt="" width={60} height={60} />
                        <Typography sx={{mt: 1}} variant='h5' color='light'> Shobhee </Typography>
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
                    <IconButton sx={{ color: 'light' }}>
                        <ShoppingCartOutlinedIcon />
                    </IconButton>
                </Stack>
            </Container>
        </AppBar >
    )
}

export default Navbar