import { Typography, Box, Divider, Grid, TextField, MenuItem, Stack, Button, IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import categoryList from './../../data/category.json';
import axios from './../../api/axios';

export default function ProductAdd() {
    const [form, setForm] = useState({});
    const [isBtnLoading, setIsBtnLoading] = useState(false);

    const SelectImage = ({ name, id }) => {
        return (
            <Button
                component='label'
                className='border-dashed border-2'
                sx={{ height: 64, width: 64 }}
            >
                <input type='file' id={id} onChange={handleFormChange} name={name} hidden accept='image/*' />
                <CameraAltOutlinedIcon />
            </Button>
        )
    };

    const ImagePreview = ({ src, name, id }) => {
        return (
            <figure className='relative w-[64px] h-[64px]' >
                <img className='fit-img rounded-md' src={src} />
                <IconButton
                    onClick={() => handleImageRemove(name, id)}
                    className='absolute'
                    sx={{ bgcolor: '#fff', color: '#121212', width: 23, height: 23, top: -10, right: -10, boxShadow: '0 0 12px rgba(0,0,0,.2)', '&:hover': { bgcolor: '#dce4e8' } }}
                >
                    <DeleteIcon sx={{ fontSize: 16, color: '#e33d27' }} />
                </IconButton>
            </figure >
        )
    };

    const handleFormSubmit = e => {
        e.preventDefault();
        setIsBtnLoading(true);
        const formData = new FormData();

        for(const key in form) {
            if(key === 'imageList') {
                form[key].forEach(file => {
                    formData.append('imageList', file)
                })
            }

            formData.append(key, form[key]);
        };
        
        axios('post', '/product', formData, () => {
            setIsBtnLoading(false);
            setForm({});
        }, () => {
            setIsBtnLoading(false);
        })
    };

    const handleFormChange = e => {
        let value;

        if (e.target.name === 'thumbnail') value = e.target.files[0];
        if (e.target.name === 'imageList') {
            value = [...form.imageList || '']
            value[e.target.id] = e.target.files[0]
        };

        setForm(prev => ({
            ...prev,
            [e.target.name]: value || e.target.value
        }));
    };

    const handleImageRemove = (name, id) => {
        let value = undefined;

        if (id) {
            value = [...form.imageList];
            value[id] = undefined
        };

        setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <Stack justifyContent='space-between'>
                <Typography variant='h6'> Add Product </Typography>
                <Button
                    component={Link}
                    to='/cp/product'
                    variant='outlined'
                    startIcon={<ArrowCircleLeftOutlinedIcon />}
                >
                    Back to Product
                </Button>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography variant='inline'> <b> General Information </b> </Typography>
            <Box sx={{ pl: 3, pt: 3 }}>
                <Grid spacing={2} container alignItems='start'>
                    <Grid item xs={2} textAlign='right' >
                        thumbnail :
                    </Grid>
                    <Grid item xs={10}>
                        {
                            form.thumbnail ?
                                <ImagePreview src={URL.createObjectURL(form.thumbnail)} name='thumbnail' />
                                :
                                <SelectImage name='thumbnail' />
                        }
                    </Grid>
                    <Grid item xs={2} textAlign='right' >
                        gallery :
                    </Grid>
                    <Grid item xs={10}>
                        <Grid spacing={2} container>
                            {
                                new Array(8).fill(1).map((input, i) => {
                                    return (
                                        <Grid key={i} item >
                                            {
                                                form.imageList && form.imageList[i] ?
                                                    <ImagePreview src={URL.createObjectURL(form.imageList[i])} id={i} name='imageList' />
                                                    :
                                                    <SelectImage id={i} name='imageList' />
                                            }
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Grid>

                    <Grid item xs={2} textAlign='right' >
                        name :
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            onChange={handleFormChange}
                            value={form.name || ''}
                            name='name'
                            size='small'
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={2} textAlign='right' >
                        detail :
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            onChange={handleFormChange}
                            value={form.detail || ''}
                            name='detail'
                            size='small'
                            minRows={6}
                            maxRows={12}
                            multiline
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={2} textAlign='right' >
                        category :
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            onChange={handleFormChange}
                            value={form.category || ''}
                            name='category'
                            size='small'
                            fullWidth
                            select
                        >
                            {
                                categoryList.map(category => {
                                    return <MenuItem key={category.name} value={category.name}> {category.name} </MenuItem>
                                })

                            }
                        </TextField>
                    </Grid>

                    <Grid item xs={2} textAlign='right' >
                        url :
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            onChange={handleFormChange}
                            value={form.url || ''}
                            name='url'
                            size='small'
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={2} textAlign='right' >
                        price :
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            onChange={handleFormChange}
                            value={form.price || ''}
                            name='price'
                            type='number'
                            size='small'
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={2} textAlign='right' >
                        sku id :
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            onChange={handleFormChange}
                            value={form.skuId || ''}
                            name='skuId'
                            size='small'
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Stack justifyContent='end'>
                <LoadingButton
                    loading={isBtnLoading}
                    type='submit'
                    variant='contained'
                    startIcon={<AddIcon />}
                    loadingPosition='start'
                >
                    Add
                </LoadingButton>
            </Stack>
        </form>
    )
}