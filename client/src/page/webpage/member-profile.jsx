import { TextField, Grid, Button, Divider, Typography, Avatar } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import UploadIcon from '@mui/icons-material/Upload';

import { useState } from 'react';
import { useAuthContext } from './../../context/auth-context';
import { useEffect } from 'react';


export default function MemberProfile() {
    const { auth } = useAuthContext();

    const [form, setForm] = useState({});

    useEffect(() => {
        setForm({
            firstName: auth?.member?.firstName,
            lastName: auth?.member?.lastName,
            tel: auth?.member?.tel,
            email: auth?.member?.email,
        });
    }, [auth])

    const handleFormChange = e => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <>
            <Typography> <b> My Profile </b> </Typography>
            <span>  Manage your personal information for the security of this account. </span>
            <Divider sx={{ my: 3 }} />
            <Grid spacing={2} container>
                <Grid xs={12} sm={8} item>
                    <TextField
                        value={form.firstName || ''}
                        onChange={handleFormChange}
                        size='small'
                        label='Firstname'
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        value={form.lastName || ''}
                        onChange={handleFormChange}
                        size='small'
                        label='Lastname'
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        value={form.tel || ''}
                        onChange={handleFormChange}
                        size='small'
                        label='Tel'
                        fullWidth
                        type='number'
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        value={form.email || ''}
                        disabled={true}
                        size='small'
                        label='Email'
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <LoadingButton
                        variant='contained'
                        size='small'
                    >
                        Save Profile
                    </LoadingButton>
                </Grid>
                <Grid xs={12} sm={4} item className='text-center'>
                    <Avatar className='mx-auto' sx={{ width: 100, height: 100 }} />
                    <Button
                        component='label'
                        className='block mx-auto mt-4 w-fit'
                    >
                        upload image
                        <input type='file' hidden />
                    </Button>
                    <small>
                        only image file is allow
                    </small>
                </Grid>
            </Grid>
        </>
    )
}