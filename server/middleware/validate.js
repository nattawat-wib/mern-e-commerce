const multer = require('./multer');
const cleanForm = require('../util/clean-form');
const Product = require('../model/product-model');

// export name for validate.methods

exports.productCreate = async (req, res, next) => {
    try {
        if (!req.files.thumbnail) throw 'thumbnail is require!';
        if (!req.files.imageList || req.files.imageList < 1) throw 'gallery is require at lease 1 image';

        cleanForm(req.body, [
            'name', 'detail', 'category', 'url', 'price', 'skuId'
        ])

        const isUrlExist = await Product.findOne({ url: req.body.url });
        const isSkuIdExist = await Product.findOne({ skuId: req.body.skuId });

        if (isUrlExist) throw 'this url is already taken';
        if (isSkuIdExist) throw 'this sku id is already taken';

        next()

    } catch (err) {
        console.log(err);
        multer.UndoUploadFile(req.files)

        res.status(400).json({
            status: 'error',
            msg: err
        })
    }
}

exports.productUpdate = async (req, res, next) => {
    try {
        if (!req.files.thumbnail) throw 'thumbnail is require!';
        if (!req.files.imageList || req.files.imageList < 1) throw 'gallery is require at lease 1 image';

        cleanForm(req.body, [
            'name', 'detail', 'category', 'url', 'price', 'skuId'
        ])

        const isUrlExist = await Product.findOne({ url: req.body.url });
        const isSkuIdExist = await Product.findOne({ skuId: req.body.skuId });

        if (isUrlExist) throw 'this url is already taken';
        if (isSkuIdExist) throw 'this sku id is already taken';

        next()

    } catch (err) {
        console.log(err);
        multer.UndoUploadFile(req.files)

        res.status(400).json({
            status: 'error',
            msg: err
        })
    }
}

exports.order = async (req, res, next) => {
    try {
        if(!Object.keys(req.body.address).length) throw 'please select address'
        if(!req.body.productList.length) throw "you don't have any product in cart";

        cleanForm(req.body, ['address', 'productList', 'totalProduct', 'totalPrice', 'provider', 'paymentMethod', 'deliveryPrice']);
        cleanForm(req.body.address, ['name', 'tel', 'province', 'district', 'subDistrict', 'zipCode', 'detail']);
        req.body.productList.forEach(item => {
            cleanForm(item, ['product', 'amount', 'totalPrice']);
            cleanForm(item.product, ['thumbnail', 'name', 'category', 'price', 'skuId', '_id']);
        })

        next()
    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        })
    }
}