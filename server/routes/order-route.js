const router = require('express').Router();
const orderController = require('./../controller/order-controller');

router.route('/')
    .get(orderController.create)

module.exports = router