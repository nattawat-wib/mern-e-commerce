const router = require('express').Router();
const productController = require('./../controller/product-controller');
const multer = require('./../middleware/multer');
const validate = require('../middleware/validate');

router.route('/')
    .post(
        multer.config.fields([{ name: 'thumbnail' }, { name: 'imageList' }]),
        validate.product,
        productController.create
    )
    .get(
        productController.getAll
    )

module.exports = router