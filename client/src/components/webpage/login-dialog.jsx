import { IconButton, Checkbox, Button, Dialog, DialogContent, DialogActions, Typography, TextField, Divider, InputAdornment } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton';

import EmailIcon from '@mui/icons-material/Email';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from 'react';

const LoginDialog = ({ isLoginDialogOpen, setIsLoginDialogOpen, setIsRegisterDialogOpen }) => {
    const [form, setForm] = useState({});
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const setInputAdornment = () => {
        return (
            <InputAdornment position='end'>
                <IconButton onClick={() => setIsPasswordShow(prev => !prev)}>
                    {
                        isPasswordShow ?
                            <VisibilityIcon />
                            :
                            <VisibilityOffIcon />
                    }
                </IconButton>
            </InputAdornment>
        )
    }

    const handleFormChange = e => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value  
        }))
    }

    const handleFormSubmit = async e => {
        // const result = await apiRegister();
    }

    return (
        <Dialog
            maxWidth='xs'
            open={isLoginDialogOpen}
            onClose={() => setIsLoginDialogOpen(false)}
        >
            <div className='flex justify-between items-center px-4 py-2'>
                <Typography className='font-bold' color='primary'>
                    Login
                </Typography>
                <IconButton onClick={() => setIsLoginDialogOpen(false)} >
                    <CloseIcon color='primary' />
                </IconButton>
            </div>
            <Divider />
            <DialogContent>
                <TextField
                    label='Email'
                    sx={{ mb: 2 }}
                    size='small'
                    fullWidth
                    InputProps={{
                        startAdornment: (<InputAdornment position='start'> <EmailIcon /> </InputAdornment>),
                    }}
                />
                <TextField
                    type={isPasswordShow ? 'text' : 'password'}
                    label='Password'
                    sx={{ mb: 2, '.MuiOutlinedInput-root': { pr: 0 } }}
                    size='small'
                    fullWidth
                    InputProps={{
                        startAdornment: (<InputAdornment position='start'> <LockIcon /> </InputAdornment>),
                        endAdornment: setInputAdornment()
                    }}
                />
                <Typography align='center'> don't have any account ?
                    <b
                        onClick={
                            () => {
                                setIsLoginDialogOpen(false)
                                setIsRegisterDialogOpen(true)
                            }
                        }
                        style={{ cursor: 'pointer', paddingLeft: '5px' }}
                    >
                        Register
                    </b>
                </Typography>
            </DialogContent>
            <Divider />
            <DialogActions>
                <LoadingButton
                    startIcon={<LoginIcon />}
                    variant='contained'
                    loadingPosition='start'
                // loading={true}
                >
                    Login
                </LoadingButton>
            </DialogActions>

        </Dialog>
    )
}

export default LoginDialog