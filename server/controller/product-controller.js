const Product = require('./../model/product-model');

exports.create = async (req, res) => {
    try {
        console.log(req.body);

        res.status(200).json({
            status: 'success',
            msg: 'create product successfully',
            // data: {
            //     newProduct
            // }
        })

    } catch (error) {
        console.log(error);

        res.status(400).json({
            status: 'error',
            msg: error
        })
    }
}