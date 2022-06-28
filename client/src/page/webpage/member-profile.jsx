import { TextField, Grid, Button, Divider, Typography, Avatar } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import UploadIcon from '@mui/icons-material/Upload';

import { useState } from 'react';
import { useAuthContext } from './../../context/auth-context';
import { useEffect } from 'react';
import axios from '../../api/axios';


export default function MemberProfile() {
    const { auth, authDispatch } = useAuthContext();
    const [form, setForm] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setForm({
            avatar: auth?.member?.avatar,
            firstName: auth?.member?.firstName,
            lastName: auth?.member?.lastName,
            tel: auth?.member?.tel,
        });
    }, [auth])

    const handleFormChange = e => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value
        }))
    }

    const handleFormSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in form) formData.append(key, form[key]);

        axios('patch', '/member', formData, resp => {
            authDispatch({ type: 'update', payload: resp.data })
        }, null, true, [setIsLoading])
    }

    return (
        <>
            <Typography> <b> My Profile </b> </Typography>
            <span>  Manage your personal information for the security of this account. </span>
            <Divider sx={{ my: 3 }} />
            <Grid
                component='form'
                onSubmit={handleFormSubmit}
                spacing={2}
                container
            >
                <Grid xs={12} sm={8} item>
                    <TextField
                        value={form.firstName || ''}
                        onChange={handleFormChange}
                        name='firstName'
                        size='small'
                        label='Firstname'
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        value={form.lastName || ''}
                        onChange={handleFormChange}
                        name='lastName'
                        size='small'
                        label='Lastname'
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        value={form.tel || ''}
                        onChange={handleFormChange}
                        name='tel'
                        size='small'
                        label='Tel'
                        fullWidth
                        type='number'
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        value={auth?.member?.email || ''}
                        disabled={true}
                        size='small'
                        label='Email'
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <LoadingButton
                        loading={isLoading}
                        type='submit'
                        variant='contained'
                        size='small'
                    >
                        Save Profile
                    </LoadingButton>
                </Grid>
                <Grid xs={12} sm={4} item className='text-center'>
                    <Avatar
                        src={
                            form?.avatar && typeof form?.avatar !== 'string' ?
                                URL.createObjectURL(form.avatar)
                                :
                                `${import.meta.env.VITE_BASE_API}/${form.avatar}`
                        }
                        className='mx-auto'
                        sx={{ width: 100, height: 100 }}
                    />
                    <Button
                        component='label'
                        className='block mx-auto mt-4 w-fit'
                    >
                        upload image
                        <input name='avatar' onChange={handleFormChange} type='file' hidden />
                    </Button>
                    <small>
                        only image file is allow
                    </small>
                </Grid>
            </Grid>
        </>
    )
}