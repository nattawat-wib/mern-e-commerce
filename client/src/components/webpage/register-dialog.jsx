import { IconButton, Checkbox, Button, Dialog, DialogContent, DialogActions, Typography, TextField, Divider } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton';

import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import axios from './../../api/axios';

const RegisterDialog = ({ isRegisterDialogOpen, setIsRegisterDialogOpen, setIsLoginDialogOpen }) => {
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [form, setForm] = useState({});

    const handleFormChange = e => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleFormSubmit = async e => {
        e.preventDefault();
        
        await axios('post', '/auth/register', () => {
            
        })
    }

    return (
        <Dialog
            component='form'
            onSubmit={handleFormSubmit}
            maxWidth='xs'
            open={isRegisterDialogOpen}
            onClose={() => setIsRegisterDialogOpen(false)}
        >
            <div className='flex justify-between items-center px-4 py-2'>
                <Typography className='font-bold' color='primary' >
                    Register
                </Typography>
                <IconButton onClick={() => setIsRegisterDialogOpen(false)}>
                    <CloseIcon color='primary' />
                </IconButton>
            </div>
            <Divider />
            <DialogContent>
                <TextField
                    name='firstName'
                    onChange={handleFormChange}
                    label='First Name'
                    sx={{ mb: 2 }}
                    size='small'
                    fullWidth
                />
                <TextField
                    name='lastName'
                    onChange={handleFormChange}
                    label='Last Name'
                    sx={{ mb: 2 }}
                    size='small'
                    fullWidth
                />
                <TextField
                    name='email'
                    onChange={handleFormChange}
                    label='Email'
                    sx={{ mb: 2 }}
                    size='small'
                    fullWidth
                />
                <TextField
                    name='tel'
                    onChange={handleFormChange}
                    label='Tel'
                    type='number'
                    sx={{ mb: 2 }}
                    size='small'
                    fullWidth
                />
                <TextField
                    name='password'
                    onChange={handleFormChange}
                    type={isPasswordShow ? 'text' : 'password'}
                    label='Password'
                    sx={{ mb: 2 }}
                    size='small'
                    fullWidth
                />
                <TextField
                    name='passwordConfirm'
                    onChange={handleFormChange}
                    type={isPasswordShow ? 'text' : 'password'}
                    label='Password Confirm'
                    size='small'
                    fullWidth
                />
                <Button
                    component='label'
                    size='small'
                    sx={{ p: 0, pr: 1 }}
                >
                    <Checkbox onChange={e => setIsPasswordShow(e.target.checked)} />
                    show / hide password
                </Button>
                <Typography align='center'> already have any account ?
                    <b
                        onClick={
                            () => {
                                setIsRegisterDialogOpen(false)
                                setIsLoginDialogOpen(true)
                            }
                        }
                        style={{ cursor: 'pointer', paddingLeft: '5px' }}
                    >
                        Login
                    </b>
                </Typography>
            </DialogContent>
            <Divider />
            <DialogActions>
                <LoadingButton
                    type='submit'
                    startIcon={<SendIcon />}
                    variant='contained'
                    loadingPosition='start'
                // loading={true}
                >
                    Register
                </LoadingButton>
            </DialogActions>

        </Dialog>
    )
}

export default RegisterDialog