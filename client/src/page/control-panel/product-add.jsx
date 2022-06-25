import { Typography, Box, Divider, Grid, TextField, MenuItem, Stack, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import AddIcon from '@mui/icons-material/Add';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import categoryList from './../../data/category.json';

export default function ProductAdd() {
    const SelectImage = ({ name }) => {
        return (
            <Button
                component='label'
                className='border-dashed border-2'
                sx={{ height: 64, width: 64 }}
            >
                <input type='file' hidden name={name} onChange={handleFormChange} />
                <CameraAltOutlinedIcon />
            </Button>
        )
    };

    const [form, setForm] = useState({});

    const handleFormSubmit = e => {
        console.log(form);
        e.preventDefault();
    }

    const handleFormChange = e => {

        console.log(e.target.value);
        console.log(e.target.name);

        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

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
                        <SelectImage />
                    </Grid>
                    <Grid item xs={2} textAlign='right' >
                        gallery :
                    </Grid>
                    <Grid item xs={10}>
                        <Grid spacing={2} container>
                            <Grid item >
                                <SelectImage />
                            </Grid>
                            <Grid item >
                                <SelectImage />
                            </Grid>
                            <Grid item >
                                <SelectImage />
                            </Grid>
                            <Grid item >
                                <SelectImage />
                            </Grid>
                            <Grid item >
                                <SelectImage />
                            </Grid>
                            <Grid item >
                                <SelectImage />
                            </Grid>
                            <Grid item >
                                <SelectImage />
                            </Grid>
                            <Grid item >
                                <SelectImage />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={2} textAlign='right' >
                        name :
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            onChange={handleFormChange}
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
                            name='category'
                            size='small'
                            fullWidth
                            select
                            value={form.category || ''}
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
                    // loading={true}
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