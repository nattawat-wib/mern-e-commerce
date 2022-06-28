const router = require('express').Router();
const reviewController = require('./../controller/review-controller');

router.post('/:productSku', reviewController.create)

module.exports = router;