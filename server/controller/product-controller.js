const Product = require('./../model/product-model');
const multer = require('./../middleware/multer');

exports.create = async (req, res) => {
    try {
        for (const key in req.files) {
            req.files[key] = req.files[key].map(file => file.filename)
        }

        const newProduct = await Product.create({
            ...req.body,
            thumbnail: req.files.thumbnail[0],
            imageList: req.files.imageList
        })

        res.status(200).json({
            status: 'success',
            msg: 'create product successfully',
            data: {
                newProduct
            }
        })

    } catch (error) {
        console.log(error);
        multer.UndoUploadFile(req.files);

        res.status(400).json({
            status: 'error',
            msg: error
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        const allProduct = await Product.find().sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            msg: 'all product',
            data: {
                product: allProduct
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
        const product = await Product
            .findOne({ skuId: req.params.skuId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            msg: 'product that match with this skuid',
            data: {
                product
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

exports.update = async (req, res) => {
    try {
        // console.log('req.body.imageList', req.body.imageList);
        // console.log('req.files.imageList', req.files.imageList);

        delete req.body.imageList;
        // for (const key in req.files) {
        //     req.files[key] = req.files[key].map(file => file.filename)
        // }

        const product = await Product.findByIdAndUpdate(req.body._id, {
            ...req.body,
            thumbnail: req.body.thumbnail || req.files.thumbnail[0].filename,
            // imageList: [],
            // imageList: req.files.imageList
        }, { new: true });

        res.status(200).json({
            status: 'success',
            msg: 'product update successfully',
            data: {
                product
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

exports.delete = async (req, res) => {
    try {
        const product = await Product
            .findOneAndDelete({ skuId: req.params.skuId })

        res.status(200).json({
            status: 'success',
            msg: 'product that match with this skuid',
        })

    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        })
    }
}

exports.search = async (req, res) => {
    try {
        // const result = await Product.find({ name: { $regex: req.params.key } }).select('name -_id');
        const result = await Product.find().select('name skuId category');

        res.status(200).json({
            status: 'success',
            msg: 'search result',
            data: {
                result
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