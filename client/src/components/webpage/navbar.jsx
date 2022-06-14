import { AppBar, Container, Box, Stack, Button, TextField, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = () => {
    return (
        <AppBar position='sticky' sx={{ bgcolor: 'primary.dark' }}>
            <Container>
                <Box className='flex items-center justify-between py-1' >
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

                <Stack justifyContent='space-between'>
                    <Stack>
                        <img src="/image/favicon.png" alt="" width={40} height={40} />
                        <Typography color='light'> Shobhee </Typography>
                    </Stack>
                    <TextField variant='filled' sx={{ bgcolor: 'ligh.main' }} />
                    <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
                </Stack>
            </Container>
        </AppBar >
    )
}

export default Navbar