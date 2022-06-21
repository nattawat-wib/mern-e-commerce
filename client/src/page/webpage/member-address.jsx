import { TextField, Grid, Button, Divider, Typography, Dialog, DialogContent, DialogActions, IconButton } from '@mui/material';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogConfirm from './../../components/util/dialog-confirm';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

export default function MemberAddress() {
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);

    const handleEditAddress = () => {

        setIsAddressDialogOpen(true)
    }

    return (
        <>
            <DialogConfirm
                isOpen={isConfirmDialogOpen}
                setIsOpen={setIsConfirmDialogOpen}
                callback={() => alert('success')}
            />
            <Dialog
                open={isAddressDialogOpen}
                onClose={() => setIsAddressDialogOpen(false)}
            >
                <div className='flex justify-between items-center py-2 px-4'>
                    Manage Address
                    <IconButton onClick={() => setIsAddressDialogOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Divider />
                <DialogContent>
                    <TextField
                        sx={{ mb: 3 }}
                        size='small'
                        label='firstname'
                        fullWidth
                    />
                    <TextField
                        sx={{ mb: 3 }}
                        size='small'
                        label='lastname'
                        fullWidth
                    />
                    <TextField
                        sx={{ mb: 3 }}
                        size='small'
                        label='tel'
                        fullWidth
                        type='number'
                    />
                    <TextField
                        size='small'
                        label='address'
                        fullWidth
                        multiline={true}
                        rows={5}
                    />
                </DialogContent>
                <Divider />
                <DialogActions className='p-4'>
                    <Button variant='contained' size='small'> Confirm </Button>
                </DialogActions>
            </Dialog>

            <div className='flex justify-between items-center'>
                <Typography> <b> My Address </b> </Typography>
                <Button
                    onClick={() => setIsAddressDialogOpen(true)}
                    startIcon={<AddIcon />}
                    variant='contained'
                    size='small'
                >
                    Add address
                </Button>
            </div>
            {
                new Array(3).fill(1).map(address => {
                    return (
                        <section key={Math.random()}>
                            <Divider sx={{ mt: 2, mb: 3 }} />
                            <Grid spacing={2} container sx={{ mb: 1 }}>
                                <Grid xs={2} item className='text-right'> fullname : </Grid>
                                <Grid xs={7} item> nutella tester </Grid>
                                <Grid xs={3} item className='flex justify-end'>
                                    <Button
                                        onClick={handleEditAddress}
                                        startIcon={<EditIcon />}
                                        size='small'
                                        sx={{ mr: 2 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => setIsConfirmDialogOpen(true)}
                                        startIcon={<DeleteIcon />}
                                        size='small'
                                    >
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid spacing={2} container sx={{ mb: 1 }}>
                                <Grid xs={2} item className='text-right'> Tel : </Grid>
                                <Grid xs={7} item> 0987654321 </Grid>
                                <Grid xs={3} item className='flex justify-end'>
                                    <LoadingButton variant='outlined' size='small'> set to default </LoadingButton>
                                </Grid>
                            </Grid>
                            <Grid spacing={2} container sx={{ mb: 1 }}>
                                <Grid xs={2} item className='text-right'> Address : </Grid>
                                <Grid xs={7} item> Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, libero quidem temporibus sed molestiae </Grid>
                                <Grid xs={3} item >  </Grid>
                            </Grid>
                        </section>
                    )
                })
            }
        </>
    )
}