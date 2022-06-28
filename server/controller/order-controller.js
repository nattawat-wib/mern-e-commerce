const Order = require('./../model/order-model');

exports.create = async (req, res) => {
    try {

        res.status(200).json({
            status: 'success',
            msg: 'create order successfully'
        })
    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        })

    }
}