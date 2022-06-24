import { Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Avatar, Box, Divider } from '@mui/material';
import { useState } from 'react';

import CustomTable from '../../components/control-panel/custom-table';

export default function Bank() {
    const createData = (avatar, firstName, lastName, tel, email) => {
        return { avatar, firstName, lastName, tel, email };
    }

    const rows = [
        createData('', 'Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('', 'Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('', 'Eclair', 262, 16.0, 24, 6.0),
        createData('', 'Cupcake', 305, 3.7, 67, 4.3),
        createData('', 'Gingerbread', 356, 16.0, 49, 3.9),
        createData('', 'Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('', 'Eclair', 262, 16.0, 24, 6.0),
        createData('', 'Cupcake', 305, 3.7, 67, 4.3),
        createData('', 'Gingerbread', 356, 16.0, 49, 3.9),
        createData('', 'Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('', 'Eclair', 262, 16.0, 24, 6.0),
        createData('', 'Cupcake', 305, 3.7, 67, 4.3),
        createData('', 'Gingerbread', 356, 16.0, 49, 3.9),
        createData('', 'Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('', 'Eclair', 262, 16.0, 24, 6.0),
        createData('', 'Cupcake', 305, 3.7, 67, 4.3),
        createData('', 'Gingerbread', 356, 16.0, 49, 3.9),
        createData('', 'Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('', 'Eclair', 262, 16.0, 24, 6.0),
        createData('', 'Cupcake', 305, 3.7, 67, 4.3),
        createData('', 'Gingerbread', 356, 16.0, 49, 3.9),
    ];
    return (
        <>
            <Typography variant='h5'> Bank </Typography>
            <CustomTable data={rows}>
                <>
                    <TableCell>
                        <Avatar src={'row.avatar'} />
                    </TableCell>
                    <TableCell> {'row.firstName'} </TableCell>
                    <TableCell> {'row.lastName'} </TableCell>
                    <TableCell> {'row.tel'} </TableCell>
                    <TableCell> {'row.email'} </TableCell>
                </>
            </CustomTable>
        </>
    )
}