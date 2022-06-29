const Order = require('./../model/order-model');
const cleanForm = require('./../util/clean-form');
const Cart = require('./../model/cart-model');
const nodemailer = require('nodemailer');

exports.create = async (req, res) => {
    try {
        // generate order number
        const date = new Date().toLocaleString('en-GB').split(', ')[0].split('/').join('');
        let todayOrderList = await Order.find({ orderNumber: { $regex: date } });
        todayOrderList = ("00" + String(todayOrderList.length + 1)).slice(-3);

        const order = await Order.create({
            owner: req.member._id,
            orderNumber: date + todayOrderList,
            productList: [...req.body.productList],
            status: 'waiting for payment',
            ...req.body
        });

        // clear cart item
        await Cart.findOneAndDelete({ owner: req.member._id }, {
            $unset: { productList: 1 }
        })

        // Send Email
        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASSWORD,
            }
        });

        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: req.member.email,
            subject: `Confirmed for Order Number #${order.orderNumber}`,
            html: `
                your order is already confirm, check it out with this link
                ${req.headers.origin}/order/${order.orderNumber} 

                <br />
                <br />

                <h2> Order Detail : </h2>

                ${order.productList.map(item => {
                return (
                    `
                        <div style='display: flex; align-items: center;'>
                            <div style='display: flex; align-items: center; width: 70%'>
                                <span> ${item.product.name} </span>
                            </div>
                            <div style='width: 10%; margin: 0 10px'>
                                x${item.amount.toLocaleString()}
                            </div>
                            <div style='width: 15%'>
                                ${item.totalPrice.toLocaleString()}
                            </div>
                        </div>
                        <hr style='margin: 20px 0' />
                        `
                )
                // <img src=${import.meta.env.VITE_BASE_API}/${item.product.thumbnail} width='40' height='40' />
            }).join('')
                }

                <h3 style='margin-bottom: 0'> Total Product : ${order.totalProduct.toLocaleString()} </h3>
                <h3 style='margin-top: 0'> Total Price : ${order.totalPrice.toLocaleString()} </h3>
            `
        })

        res.status(200).json({
            status: 'success',
            msg: 'create order successfully',
            data: {
                order
            }
        })
    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        })

    }
}

exports.getAll = async (req, res) => {
    try {
        const order = await Order.find().sort({ createdAt: -1 }).populate('owner', 'firstName lastName');

        res.status(200).json({
            status: 'success',
            msg: 'all order with this member id',
            data: {
                order
            }
        })
    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        })

    }
}

exports.getByMember = async (req, res) => {
    try {
        const order = await Order.find({ owner: req.member._id }).sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            msg: 'all order with this member id',
            data: {
                order
            }
        })
    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        })

    }
}

exports.getOne = async (req, res) => {
    try {
        const order = await Order.findOne({ owner: req.member._id, orderNumber: req.params.orderNumber });

        if (!order) throw 'order not found with this order number'

        res.status(200).json({
            status: 'success',
            msg: 'all order with this member id',
            data: {
                order
            }
        })
    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        })

    }
}

exports.uploadSlip = async (req, res) => {
    try {
        if (!req.file) throw 'slip is required';
        cleanForm(req.body, ['balance', 'transferTo']);

        const { status } = await Order.findOne({ owner: req.member._id, orderNumber: req.params.orderNumber });
        if (status !== 'waiting for payment') throw "can't process, status with this order is not correctly"

        const order = await Order.findOneAndUpdate({ owner: req.member._id, orderNumber: req.params.orderNumber }, {
            transaction: {
                balance: req.body.balance,
                transferTo: req.body.transferTo,
                slip: req.file.filename,
                dateTime: new Date().toLocaleString('en-GB').split(', ').join(' ')
            },
            status: 'waiting for review'
        });

        res.status(200).json({
            status: 'success',
            msg: 'upload slip successfully please wait admin for review',
            data: {
                order
            }
        })
    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        })

    }
}

exports.confirmPayment = async (req, res) => {
    try {
        const { status } = await Order.findOne({ owner: req.member._id, orderNumber: req.params.orderNumber });
        if (status !== 'waiting for review') throw "can't process, status with this order is not correctly";

        const order = await Order.findOneAndUpdate({ owner: req.member._id, orderNumber: req.params.orderNumber }, {
            status: 'waiting for shipping',
            paymentConfirmAt: Date.now(),
            paymentConfirmAtDateTime: new Date().toLocaleString('en-GB').split(', ').join(' ')
        }, { new: true });

        res.status(200).json({
            status: 'success',
            msg: 'confirm payment successfully',
            data: {
                order
            }
        })
    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        })

    }
}

exports.confirmShipping = async (req, res) => {
    try {
        cleanForm(req.body, ['provider', 'deliveryPrice', 'trackingId']);

        const { status } = await Order.findOne({ owner: req.member._id, orderNumber: req.params.orderNumber });
        if (status !== 'waiting for shipping') throw "can't process, status with this order is not correctly";

        const order = await Order.findOneAndUpdate({ owner: req.member._id, orderNumber: req.params.orderNumber }, {
            status: 'success',
            shippingDetail: {
                provider: req.body.provider,
                deliveryPrice: req.body.deliveryPrice,
                trackingId: req.body.trackingId,
            },
            shippingConfirmAt: Date.now(),
            shippingConfirmAtDateTime: new Date().toLocaleString('en-GB').split(', ').join(' '),
        }, { new: true });

        res.status(200).json({
            status: 'success',
            msg: 'confirm payment successfully',
            data: {
                order
            }
        })
    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        })

    }
}