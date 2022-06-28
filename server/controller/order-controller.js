const Order = require('./../model/order-model');
const cleanForm = require('./../util/clean-form');
const Cart = require('./../model/cart-model');

exports.create = async (req, res) => {
    try {
        const order = await Order.create({
            owner: req.member._id,
            orderNumber: Math.random().toString(32).slice(2),
            productList: [...req.body.productList],
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
        const order = await Order.create({
            owner: req.member._id,
            orderNumber: '00001',
            productList: [...req.body.productList],
            ...req.body
        });

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