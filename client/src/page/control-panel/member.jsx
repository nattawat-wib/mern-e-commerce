import { Typography, Avatar, TableCell } from '@mui/material';

import { useState, useEffect } from 'react';
import CustomTable from '../../components/control-panel/custom-table';
import axios from './../../api/axios';

export default function memberAll() {
    const [memberList, setMemberList] = useState([]);

    useEffect(() => {
        axios('get', '/member', null,
            resp => setMemberList(resp.data.member),
            null, false)
    }, [])

    const bodyRow = (index, row) => {
        return (<>
            <TableCell> {index} </TableCell>
            <TableCell>
                <Avatar
                    sx={{ width: 50, height: 50 }}
                    src={`${import.meta.env.VITE_BASE_API}/${row.avatar}`}
                />
            </TableCell>
            <TableCell> {row.username} </TableCell>
            <TableCell> {row.firstName} {row.lastName} </TableCell>
            <TableCell> {row.email} </TableCell>
            <TableCell> {row.tel} </TableCell>
            <TableCell> {row.createdAtDateTime} </TableCell>
        </>)
    }

    return (
        <>
            <Typography variant='h6'> Member </Typography>
            <CustomTable
                data={memberList}
                bodyRow={bodyRow}
                headColumn={['#', 'avatar', 'username', 'fullname', 'email', 'tel', 'created at']}
            />
        </>
    )
}