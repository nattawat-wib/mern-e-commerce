import { Typography, TableCell } from '@mui/material';

import CustomTable from '../../components/control-panel/custom-table';
import bankList from './../../data/bank.json';

export default function ProductAll() {
    const bodyRow = (index, row) => {
        return (
            <>
                <TableCell> {index} </TableCell>
                <TableCell>
                    <img
                        className='fix-img rounded-md'
                        width={50} height={50}
                        src={`/image/bank-order-eng/${row.name}.png`}
                    />
                </TableCell>
                <TableCell> {row.name} </TableCell>
                <TableCell> {row.bankAccount} </TableCell>
                <TableCell> {row.accountName} </TableCell>
            </>
        )
    }

    return (
        <>
            <Typography variant='h6'> Bank </Typography>
            <CustomTable
                data={bankList}
                bodyRow={bodyRow}
                headColumn={['#', 'logo', 'bank', 'bank account', 'account name']}
            />
        </>
    )
}