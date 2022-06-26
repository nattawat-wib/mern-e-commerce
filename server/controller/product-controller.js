const Product = require('./../model/product-model');
const multer = require('./../middleware/multer');

exports.create = async (req, res) => {
    try {        
        for(const key in req.files)  {
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

        res.status(200).json({
            status: 'success',
            msg: 'create product successfully',
            // data: {
            //     newProduct
            // }
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