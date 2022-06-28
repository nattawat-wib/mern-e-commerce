import { Button, Typography, Container, Divider, MenuItem, Paper, TextField } from "@mui/material"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { PageWrapper } from "../../style/util.style"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
import axios from "../../api/axios";
import bankList from './../../data/bank.json';
import LoadingButton from "@mui/lab/LoadingButton";

export default function ConfirmSlip() {
    const [order, setOrder] = useState([]);
    const [selectTransferTo, setSelectTransferTo] = useState('');
    const [amount, setAmount] = useState('');
    const [slip, setSlip] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { orderNumber } = useParams();
    const navigate = useNavigate();

    useEffect(() => axios('get', `/order/${orderNumber}`, null, resp => {
        setOrder(resp.data.order)
    }, null, false), [])

    const handleFormSubmit = e => {
        e.preventDefault();

        const selectBank = bankList.find(bank => bank._id === selectTransferTo);

        console.log(amount);
        console.log(selectBank);

        const formData = new FormData();
        formData.append('slip', slip)
        formData.append('balance', amount)
        formData.append('transferTo', selectBank?.name || '')

        axios('patch', `/order/upload-slip/${order.orderNumber}`, formData, resp => {
            navigate(`/order/${resp.data.order.orderNumber}`)
        }, null, true, [setIsLoading])
    }

    return (
        <PageWrapper>
            <Container sx={{ p: 4 }} maxWidth='sm'>
                <Button
                    startIcon={<ArrowBackIcon />}
                    component={Link}
                    to={`/order/${orderNumber}`}
                >
                    Back to order
                </Button>
                <Paper
                    component='form'
                    onSubmit={handleFormSubmit}
                    sx={{ p: 4 }}
                    className='text-center'
                >
                    <img
                        className='fix-img rounded-md mx-auto block w-[200px] h-[200px] mb-4'
                        src={slip ? URL.createObjectURL(slip) : 'https://via.placeholder.com/500?text=select+image'}
                    />
                    <Button component='label'>
                        Upload Slip
                        <input
                            onChange={e => setSlip(e.target.files[0])}
                            type='file'
                            accept='image/*'
                            hidden
                        />
                    </Button>
                    <br />
                    <small> accept only image file </small>

                    <Divider sx={{ my: 3 }} />
                    <Typography textAlign='right' sx={{ mb: 2 }}> Total Price : {order.totalPrice?.toLocaleString()} </Typography>
                    <TextField
                        sx={{ mb: 3 }}
                        onChange={e => setAmount(e.target.value)}
                        value={amount}
                        variant='outlined'
                        size='small'
                        label='amount'
                        type='number'
                        fullWidth
                    />
                    <TextField
                        onChange={e => setSelectTransferTo(e.target.value)}
                        value={selectTransferTo}
                        variant='outlined'
                        size='small'
                        label='transfer to'
                        fullWidth
                        select
                    >
                        {
                            bankList.map(bank => {
                                return (
                                    <MenuItem value={bank._id} key={bank._id}>
                                        <img src={`/image/bank-order-eng/${bank.name}.png`} width={30} height={30} alt="" />
                                        <Typography sx={{ ml: 2 }}> {bank.bankAccount} {bank.accountName} </Typography>
                                    </MenuItem>
                                )
                            })
                        }
                    </TextField>
                    <Divider sx={{ my: 2 }} />
                    <LoadingButton loading={isLoading} type='submit' fullWidth variant='contained'> Confirm </LoadingButton>
                </Paper>
            </Container>
        </PageWrapper>
    )
}