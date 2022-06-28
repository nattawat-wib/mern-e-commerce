import { Grid, Container, Paper, Avatar, Divider, Stack, Typography, List, ListItemButton, ListItemIcon, Tabs, Tab } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';

import { useState } from 'react';
import { PageWrapper } from '../../style/util.style';
import { useAuthContext } from './../../context/auth-context';
import { Link } from 'react-router-dom';

import MemberProfile from './member-profile';
import MemberAddress from './member-address';

export default function Member() {
    const [currentTab, setCurrentTab] = useState('member');
    const { auth, authDispatch } = useAuthContext();

    return (
        <PageWrapper >
            <Container sx={{ py: 4 }} >
                <Grid spacing={2} container>
                    <Grid xs={12} md={3} item>
                        <Stack justifyContent='start'>
                            <Avatar src={`${import.meta.env.VITE_BASE_API}/${auth.member?.avatar}`} sx={{ width: 50, height: 50, mr: 2 }} />
                            <Typography
                                onClick={() => setCurrentTab('member')}
                                color='primary'
                                sx={{ cursor: 'pointer' }}
                            >
                                {auth.member?.firstName} {auth.member?.lastName}
                                <br />
                                <small> <EditIcon sx={{ fontSize: 12 }} /> edit profile </small>
                            </Typography>
                        </Stack>
                        <Divider sx={{ mt: 3, mb: 2 }} />
                        <List>
                            <ListItemButton onClick={() => setCurrentTab('member')}>
                                <ListItemIcon > <AccountCircleIcon /> </ListItemIcon>
                                Edit Profile
                            </ListItemButton>
                            <ListItemButton color='primary' onClick={() => setCurrentTab('address')}>
                                <ListItemIcon> <PersonPinCircleIcon /> </ListItemIcon>
                                Address
                            </ListItemButton>
                            <ListItemButton component={Link} to='/order-history'>
                                <ListItemIcon> <PaymentIcon /> </ListItemIcon>
                                Purchase History
                            </ListItemButton>
                        </List>
                    </Grid>
                    <Grid xs={12} md={9} item>
                        <Paper sx={{ p: 4 }}>
                            <div hidden={currentTab !== 'member'}>
                                <MemberProfile />
                            </div>

                            <div hidden={currentTab !== 'address'}>
                                <MemberAddress />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </PageWrapper>
    )
}