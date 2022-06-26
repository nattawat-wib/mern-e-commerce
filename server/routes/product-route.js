const router = require('express').Router();
const productController = require('./../controller/product-controller');
const multer = require('./../middleware/multer');
const validate = require('../middleware/validate');

router
    .route('/')
    .post(
        multer.config.fields([{ name: 'thumbnail' }, { name: 'imageList' }]),
        validate.productCreate,
        productController.create
    )
    .get(productController.getAll)

router
    .route('/:skuId')
    .get(productController.getOne)
    .patch(
        multer.config.fields([{ name: 'thumbnail' }, { name: 'imageList' }]),
        validate.productUpdate,
        productController.update
    )
    .delete(productController.delete)

module.exports = router