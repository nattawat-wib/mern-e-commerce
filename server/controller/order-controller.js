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
        const order = await Order.find({ owner: req.member._id })

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
        const order = await Order.findOne({ owner: req.member._id, orderNumber: req.params.orderNumber })
        
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