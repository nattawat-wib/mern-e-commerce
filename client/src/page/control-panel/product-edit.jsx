import { Typography, Box, Divider, Grid, TextField, MenuItem, Stack, Button } from '@mui/material';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductEdit() {
    const SelectImage = () => {
        return (
            <Button
                component='label'
                className='border-dashed border-2'
                sx={{ height: 64, width: 64 }}
            >
                <input type='file' hidden />
                <CameraAltOutlinedIcon />
            </Button>
        )
    }

    return (
        <>
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
                            size='small'
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={2} textAlign='right' >
                        detail :
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
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
                            size='small'
                            fullWidth
                            select
                        >
                            <MenuItem> tester 1 </MenuItem>
                            <MenuItem> tester 2 </MenuItem>
                            <MenuItem> tester 3 </MenuItem>
                            <MenuItem> tester 4 </MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={2} textAlign='right' >
                        url :
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            size='small'
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={2} textAlign='right' >
                        price :
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
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
                            size='small'
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Box>

            <Divider sx={{ my: 3 }} />
            
            <Stack justifyContent='end'>
                <Button variant='contained'> Save </Button>
            </Stack>
        </>
    )
}