import { CpLoginBg, StyledLoginForm } from './../../style/util.style';
import './../../style/cp-login.scss'

import { Box, Button, IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';

export default function login() {
    const [isPasswordShow, setIsPasswordShow] = useState(false);

    return (
        <CpLoginBg className='main-cp-login'>
            <div className='header'>
                <div className='inner-header flex justify-center items-center'>
                    <StyledLoginForm sx={{ p: 2 }}>
                        <TextField
                            size='small'
                            variant='outlined'
                            label='username'
                            fullWidth
                        />
                        <br />
                        <br />
                        <TextField
                            type={isPasswordShow ? 'text' : 'password'}
                            size='small'
                            variant='outlined'
                            label='password'
                            fullWidth
                            sx={{ ['& .MuiOutlinedInput-root']: { pr: 0 } }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            onClick={() => setIsPasswordShow(prev => !prev)}
                                        >
                                            {
                                                isPasswordShow ?
                                                    <VisibilityOffIcon />
                                                    :
                                                    <VisibilityIcon />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <br />
                        <br />
                        <LoadingButton
                            fullWidth
                            loading={false}
                            variant='contained'
                        >
                            Login
                        </LoadingButton>
                    </StyledLoginForm>
                </div>

                <div>
                    <svg
                        className='waves'
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                        viewBox='0 24 150 28' preserveAspectRatio='none' shapeRendering='auto'
                    >
                        <defs>
                            <path id='gentle-wave' d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z' />
                        </defs>
                        <g className='parallax'>
                            <use xlinkHref='#gentle-wave' x='48' y='0' fill='rgba(255,255,255,0.7' />
                            <use xlinkHref='#gentle-wave' x='48' y='3' fill='rgba(255,255,255,0.5)' />
                            <use xlinkHref='#gentle-wave' x='48' y='5' fill='rgba(255,255,255,0.3)' />
                            <use xlinkHref='#gentle-wave' x='48' y='7' fill='#fff' />
                        </g>
                    </svg>
                </div>

            </div>

            <div className='content flex justify-center items-center'>
                <p> Shobhee | ReactJs </p>
            </div>
        </CpLoginBg>
    )
}