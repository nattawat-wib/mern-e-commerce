import { Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Avatar, Box, Divider } from '@mui/material';
import { useState } from 'react';

export default function CustomTable({ data, children }) {
    console.log(children);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const CustomTableCell = ({ text }) => {
        return (
            <TableCell sx={{ bgcolor: 'secondary.light', color: '#121212', fontWeight: 700 }}>
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
                            <CustomTableCell text='Avatar' />
                            <CustomTableCell text='Firstname' />
                            <CustomTableCell text='Lastname' />
                            <CustomTableCell text='Tel' />
                            <CustomTableCell text='Email' />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(row => {
                                    return (
                                        <TableRow
                                            hover
                                            key={Math.random()}
                                            sx={{ '&:nth-of-type(odd)': { bgcolor: '#f9f9f9' } }}
                                        >
                                            { children }
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