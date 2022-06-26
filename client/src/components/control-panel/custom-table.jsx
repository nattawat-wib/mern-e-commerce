import { Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Avatar, Box, Divider } from '@mui/material';
import { useState } from 'react';

import { useThemeContext } from './../../context/them-context';

export default function CustomTable({ data, bodyRow, headColumn }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { isDarkTheme } = useThemeContext();

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = e => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    };


    const CustomTableCell = ({ text }) => {
        return (
            <TableCell
                className='whitespace-nowrap'
                sx={{ bgcolor: 'secondary.light', color: '#121212', fontWeight: 700 }}
            >
                {text}
            </TableCell>
        )
    }

    return (
        <>
            <TableContainer sx={{ mt: 2, border: '#adadad50 solid 2px', borderRadius: '7px', maxHeight: 'calc(100vh - 300px)' }}>
                <Table sx={{ minWidth: 700 }} stickyHeader>
                    <TableHead>
                        <TableRow>
                            {
                                headColumn.map(column =>
                                    <CustomTableCell key={column} text={column} />
                                )
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, i) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={i + 1}
                                            sx={{ '&:nth-of-type(odd)': { bgcolor: isDarkTheme ? '#121212' : '#f9f9f9' } }}
                                        >
                                            {bodyRow(i + 1, row)}
                                        </TableRow>
                                    )
                                })
                        }
                    </TableBody>
                </Table>
                <Divider />
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component={Box}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}