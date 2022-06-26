import { Typography, Avatar, TableCell, Box, Divider, Stack, Button, IconButton, Tooltip } from '@mui/material';

import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useState, useEffect } from 'react';
import CustomTable from '../../components/control-panel/custom-table';
import DialogConfirm from './../../components/util/dialog-confirm';
import { Link } from 'react-router-dom';
import axios from './../../api/axios';

export default function ProductAll() {
    const [productList, setProductList] = useState([]);
    const [deleteSkuId, setDeleteSkuId] = useState(null);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const fetchAllProduct = () => {
        axios('get', '/product', null, resp => {
            setProductList(resp.data.product)
        }, null, false)
    }

    useEffect(fetchAllProduct, [])

    const handleDelete = skuId => {
        axios('delete', `/product/${skuId}`, null, fetchAllProduct, null, false);
    }

    const bodyRow = (index, thumbnail, name, category, skuId, createAt) => {
        return (<>
            <TableCell> {index} </TableCell>
            <TableCell>
                <img
                    className='fix-img rounded-md'
                    width={50} height={50}
                    src={`${import.meta.env.VITE_BASE_API}/${thumbnail}`}
                />
            </TableCell>
            <TableCell> {name} </TableCell>
            <TableCell> {category} </TableCell>
            <TableCell> {skuId} </TableCell>
            <TableCell> {createAt} </TableCell>
            <TableCell>
                <Stack>
                    <Tooltip title='edit'>
                        <IconButton
                            component={Link}
                            to={`/cp/product/${skuId}`}
                            size='small'
                            color='warning'
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='delete'>
                        <IconButton
                            onClick={() => {
                                setDeleteSkuId(skuId)
                                setIsConfirmDialogOpen(true)
                            }}
                            color='error'
                            size='small'
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </TableCell>
        </>)
    }

    return (
        <>
            <Stack justifyContent='space-between'>
                <DialogConfirm 
                    isOpen={isConfirmDialogOpen}
                    setIsOpen={setIsConfirmDialogOpen}
                    callback={() => handleDelete(deleteSkuId)}
                />
                <Typography variant='h6'> Product </Typography>
                <Button
                    component={Link}
                    to='/cp/product-add'
                    variant='contained'
                    startIcon={<AddBusinessOutlinedIcon />}
                >
                    Add Product
                </Button>
            </Stack>
            <CustomTable
                data={productList}
                bodyRow={bodyRow}
                headColumn={['#', 'thumbnail', 'name', 'category', 'sku id', 'created at', 'action']}
            >
            </CustomTable>
        </>
    )
}