import { Typography, Avatar, TableCell, Box, Divider, Stack, Button, IconButton, Tooltip } from '@mui/material';

import { useState, useEffect } from 'react';
import CustomTable from '../../components/control-panel/custom-table';
import { Link } from 'react-router-dom';
import axios from './../../api/axios';

export default function ProductAll() {
    const [orderList, setOrderList] = useState([]);

    useEffect(() => axios('get', '/order', null, resp => {
        setOrderList(resp.data.order)
    }, null, false), [])

    const bodyRow = (index, order) => {
        return (<>
            <TableCell> {index} </TableCell>
            <TableCell> {order.orderNumber} </TableCell>
            <TableCell> {order.owner.firstName} {order.owner.lastName} </TableCell>
            <TableCell> {order.totalProduct.toLocaleString()} </TableCell>
            <TableCell> {order.totalPrice.toLocaleString()} </TableCell>
            <TableCell> {order.provider} </TableCell>
            <TableCell> {order.paymentMethod} </TableCell>
            <TableCell> {order.status} </TableCell>
            <TableCell> {order.createdAtDateTime} </TableCell>
            <TableCell>
                <Button
                    component={Link}
                    to={`/cp/order/${order.orderNumber}`}
                    variant='outlined'
                    size='small'
                >
                    Detail
                </Button>
            </TableCell>
        </>)
    }

    return (
        <>
            <Typography variant='h6'> Order </Typography>
            <CustomTable
                data={orderList}
                bodyRow={bodyRow}
                headColumn={['#', 'Order Number', 'Order By', 'Total Product', 'Total Price', 'Provider', 'Payment Method', 'Status', 'Order Time', 'action']}
            >
            </CustomTable>
        </>
    )
}