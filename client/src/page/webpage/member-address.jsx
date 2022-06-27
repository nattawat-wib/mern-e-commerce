import { TextField, Grid, Button, Divider, Typography, Dialog, DialogContent, DialogActions, IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import { useState, useEffect } from 'react';
import DialogConfirm from './../../components/util/dialog-confirm';
import axios from '../../api/axios';
import { useAuthContext } from './../../context/auth-context';

export default function MemberAddress() {
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);

    const [addressList, setAddressList] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({});
    const [dialogMode, setDialogMode] = useState('add');

    const { auth, authDispatch } = useAuthContext();

    useEffect(() => {
        fetchAddress()
        setForm({
            name: `${auth?.member?.firstName} ${auth?.member?.lastName}`,
            tel: auth?.member?.tel,
        })
    }, [auth])

    const fetchAddress = () => {
        axios('get', '/address', null, resp => setAddressList(resp.data.address), null, false);
    }

    const handleFormChange = e => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleChangDefaultAddress = id => {
        axios('patch', `/address/set-default/${id}`, null, resp => {
            fetchAddress()
            authDispatch({ type: 'update', payload: resp.data })
        });
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        const method = dialogMode === 'add' ? 'post' : 'patch';
        const url = dialogMode === 'add' ? '/address' : `/address/${editId}`;

        console.log(method, url);

        axios(method, url, form, resp => {
            setForm({})
            fetchAddress()
            setIsAddressDialogOpen(false)
        }, null, true);
    }

    const handleFormDelete = () => {
        axios('delete', `/address/${deleteId}`, null, () => {
            setForm({})
            fetchAddress()
        }, null, true, [setIsConfirmDialogOpen]);
    }

    const handleEditAddress = address => {
        setForm({
            name: address.name,
            tel: address.tel,
            province: address.province,
            district: address.district,
            subDistrict: address.subDistrict,
            zipCode: address.zipCode,
            detail: address.detail,
        })
        setIsAddressDialogOpen(true)
    }

    return (
        <>
            <DialogConfirm
                isOpen={isConfirmDialogOpen}
                setIsOpen={setIsConfirmDialogOpen}
                callback={handleFormDelete}
            />
            <Dialog
                component='form'
                onSubmit={handleFormSubmit}
                open={isAddressDialogOpen}
                onClose={() => setIsAddressDialogOpen(false)}
                maxWidth='xs'
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
                        onChange={handleFormChange}
                        value={form.name || ''}
                        size='small'
                        name='name'
                        label='name'
                        sx={{ mb: 3 }}
                        fullWidth
                    />
                    <TextField
                        onChange={handleFormChange}
                        value={form.tel || ''}
                        sx={{ mb: 3 }}
                        name='tel'
                        label='tel'
                        size='small'
                        fullWidth
                        type='number'
                    />
                    <TextField
                        onChange={handleFormChange}
                        value={form.province || ''}
                        sx={{ mb: 3 }}
                        name='province'
                        label='province'
                        size='small'
                        fullWidth
                    />
                    <TextField
                        onChange={handleFormChange}
                        value={form.district || ''}
                        sx={{ mb: 3 }}
                        name='district'
                        label='district'
                        size='small'
                        fullWidth
                    />
                    <TextField
                        onChange={handleFormChange}
                        value={form.subDistrict || ''}
                        sx={{ mb: 3 }}
                        name='subDistrict'
                        label='sub district'
                        size='small'
                        fullWidth
                    />
                    <TextField
                        onChange={handleFormChange}
                        value={form.zipCode || ''}
                        sx={{ mb: 3 }}
                        name='zipCode'
                        label='zip code'
                        size='small'
                        fullWidth
                        type='number'
                    />
                    <TextField
                        onChange={handleFormChange}
                        value={form.detail || ''}
                        size='small'
                        name='detail'
                        label='detail'
                        fullWidth
                        multiline={true}
                        rows={5}
                    />
                </DialogContent>
                <Divider />
                <DialogActions className='p-4'>
                    <LoadingButton
                        type='submit'
                        variant='contained'
                        size='small'
                    >
                        Confirm
                    </LoadingButton>
                </DialogActions>
            </Dialog>

            <div className='flex justify-between items-center'>
                <Typography> <b> My Address </b> </Typography>
                <Button
                    onClick={() => {
                        setForm({})
                        setForm({
                            name: `${auth?.member?.firstName} ${auth?.member?.lastName}`,
                            tel: auth?.member?.tel,
                        })
                        setDialogMode('add')
                        setIsAddressDialogOpen(true)
                    }}
                    startIcon={<AddIcon />}
                    variant='contained'
                    size='small'
                >
                    Add address
                </Button>
            </div>
            {
                !addressList.length ?
                    <Typography textAlign='center' sx={{ my: 5 }}> no any address was saved </Typography>
                    :
                    addressList.map(address => {
                        return (
                            <section key={Math.random()}>
                                <Divider sx={{ mt: 2, mb: 3 }} />
                                <Grid spacing={2} container sx={{ mb: 1 }}>
                                    <Grid xs={2} item className='text-right'> name : </Grid>
                                    <Grid xs={7} item> {address.name} </Grid>
                                    <Grid xs={3} item className='flex justify-end'>
                                        <Button
                                            onClick={() => {
                                                setDialogMode('edit')
                                                setEditId(address._id)
                                                handleEditAddress(address)
                                            }}
                                            startIcon={<EditIcon />}
                                            size='small'
                                            sx={{ mr: 2 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setDeleteId(address._id)
                                                setIsConfirmDialogOpen(true)
                                            }}
                                            startIcon={<DeleteIcon />}
                                            size='small'
                                        >
                                            Delete
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid spacing={2} container sx={{ mb: 1 }}>
                                    <Grid xs={2} item className='text-right'> Tel : </Grid>
                                    <Grid xs={7} item> {address.tel} </Grid>
                                    <Grid xs={3} item className='flex justify-end'>
                                        {
                                            auth?.member?.addressDefault?._id === address._id ?
                                                <Button disabled={true} size='small'> default </Button>
                                                :
                                                <LoadingButton
                                                    onClick={() => handleChangDefaultAddress(address._id)}
                                                    variant='outlined'
                                                    size='small'
                                                >
                                                    set to default
                                                </LoadingButton>
                                        }
                                    </Grid>
                                </Grid>
                                <Grid spacing={2} container sx={{ mb: 1 }}>
                                    <Grid xs={2} item className='text-right'> Address : </Grid>
                                    <Grid xs={7} item>
                                        {`${address.province} ${address.district} ${address.subDistrict} ${address.zipCode} ${address.detail}`}
                                    </Grid>
                                    <Grid xs={3} item >  </Grid>
                                </Grid>
                            </section>
                        )
                    })
            }
        </>
    )
}