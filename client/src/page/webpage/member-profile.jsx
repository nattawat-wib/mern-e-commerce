import { TextField, Grid, Button, Divider, Typography, Avatar } from '@mui/material';
import { useState } from 'react';

import UploadIcon from '@mui/icons-material/Upload';

export default function MemberProfile() {
    return (
        <>
            <Typography> <b> My Profile </b> </Typography>
            <span>  Manage your personal information for the security of this account. </span>
            <Divider sx={{ my: 3 }} />
            <Grid spacing={2} container>
                <Grid xs={12} sm={8} item>
                    <TextField
                        size='small'
                        label='Firstname'
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        size='small'
                        label='Lastname'
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        size='small'
                        label='Tel'
                        fullWidth
                        type='number'
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        size='small'
                        label='Email'
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <Button
                        variant='contained'
                        size='small'
                    >
                        Save Profile
                    </Button>
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