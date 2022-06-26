const multer = require('./multer');
const cleanForm = require('../util/clean-form');
const Product = require('../model/product-model');

// export name for validate.methods

exports.productCreate = async (req, res, next) => {
    try {
        if(!req.files.thumbnail) throw 'thumbnail is require!';
        if(!req.files.imageList || req.files.imageList < 1) throw 'gallery is require at lease 1 image';

        cleanForm(req.body, [
            'name', 'detail', 'category', 'url', 'price', 'skuId'
        ])

        const isUrlExist = await Product.findOne({ url: req.body.url });
        const isSkuIdExist = await Product.findOne({ skuId: req.body.skuId });

        if(isUrlExist) throw 'this url is already taken';
        if(isSkuIdExist) throw 'this sku id is already taken';

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
        if(!req.files.thumbnail) throw 'thumbnail is require!';
        if(!req.files.imageList || req.files.imageList < 1) throw 'gallery is require at lease 1 image';

        cleanForm(req.body, [
            'name', 'detail', 'category', 'url', 'price', 'skuId'
        ])

        const isUrlExist = await Product.findOne({ url: req.body.url });
        const isSkuIdExist = await Product.findOne({ skuId: req.body.skuId });

        if(isUrlExist) throw 'this url is already taken';
        if(isSkuIdExist) throw 'this sku id is already taken';

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