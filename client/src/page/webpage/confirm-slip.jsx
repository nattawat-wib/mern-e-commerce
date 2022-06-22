import { PageWrapper } from "../../style/util.style"
import { Button, Container, Divider, MenuItem, Paper, TextField } from "@mui/material"
import { Link } from "react-router-dom"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ConfirmSlip() {
    return (
        <PageWrapper>
            <Container sx={{ p: 4 }} maxWidth='sm'>
                <Button
                    startIcon={<ArrowBackIcon />}
                    component={Link}
                    to={`/order/${Math.random().toString().slice(2)}`}
                >
                    Back to order
                </Button>
                <Paper sx={{ p: 4 }} className='text-center' >
                    <img
                        className='fix-img mx-auto block w-[200px] h-[200px] mb-4'
                        src='https://via.placeholder.com/500?text=select+image'
                    />
                    <Button component='label'>
                        Upload Slip
                        <input type='file' accept='image/*' hidden />
                    </Button>
                    <br />
                    <small> accept only image file </small>

                    <Divider sx={{ my: 3 }} />
                    <TextField
                        sx={{ mb: 3 }}
                        variant='outlined'
                        size='small'
                        label='date'
                        fullWidth
                    />
                    <TextField
                        sx={{ mb: 3 }}
                        variant='outlined'
                        size='small'
                        label='time'
                        fullWidth
                    />
                    <TextField
                        sx={{ mb: 3 }}
                        variant='outlined'
                        size='small'
                        label='amount'
                        fullWidth
                    />
                    <TextField
                        variant='outlined'
                        size='small'
                        label='transfer to'
                        fullWidth
                        select
                    >
                        <MenuItem>
                            <img
                                className='fix-img block w-[20px] h-[20px] mr-2'
                                src='https://via.placeholder.com/500?text=select+image'
                            />
                            h1
                        </MenuItem>
                        <MenuItem>
                            <img
                                className='fix-img block w-[20px] h-[20px] mr-2'
                                src='https://via.placeholder.com/500?text=select+image'
                            />
                            h1
                        </MenuItem>
                        <MenuItem>
                            <img
                                className='fix-img block w-[20px] h-[20px] mr-2'
                                src='https://via.placeholder.com/500?text=select+image'
                            />
                            h1
                        </MenuItem>
                    </TextField>
                    <Divider sx={{ my: 2 }} />
                    <Button fullWidth variant='contained'> Confirm </Button>
                </Paper>
            </Container>
        </PageWrapper>
    )
}