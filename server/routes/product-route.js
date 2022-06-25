const router = require('express').Router();
const productController = require('./../controller/product-controller');
const multerConfig = require('./../middleware/multer');

router.post('/',
    multerConfig.fields([{ name: 'thumbnail' }, { name: 'imageList' }]),
    productController.create
)

module.exports = router