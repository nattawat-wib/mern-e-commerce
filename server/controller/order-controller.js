const Order = require('./../model/order-model');
const cleanForm = require('./../util/clean-form');
const Cart = require('./../model/cart-model');

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const order = await Order.create({
            owner: req.member._id,
            orderNumber: Math.random().toString(32).slice(2),
            productList: [...req.body.productList],
            status: 'waiting for payment',
            ...req.body
        });

        await Cart.findOneAndDelete({ owner: req.member._id }, {
            $unset: { productList: 1 }
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
        const order = await Order.find({ owner: req.member._id }).sort({ createdAt: -1 }).populate('owner', 'firstName lastName');

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

        console.log(req.body);
        // throw 'tttt'

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