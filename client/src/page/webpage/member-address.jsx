import { TextField, Grid, Button, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogConfirm from './../../components/util/dialog-confirm';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function MemberAddress() {
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    return (
        <>
            <DialogConfirm
                isOpen={isConfirmDialogOpen}
                setIsOpen={setIsConfirmDialogOpen}
                callback={() => alert('success')}
            />
            <div className='flex justify-between items-center'>
                <Typography> <b> My Address </b> </Typography>
                <Button
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
                                    <Button startIcon={<EditIcon />} size='small' sx={{ mr: 2 }}> Edit </Button>
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
                                    <LoadingButton size='small'> set to default </LoadingButton>
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