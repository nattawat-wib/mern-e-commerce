const Review = require('./../model/review-model');
const cleanForm = require('./../util/clean-form');

exports.create = async (req, res) => {
    try {
        cleanForm(req.body, ['rating', 'content'])

        const review = await Review.create({
            fromOrder,
            author,
            rating,
            content,
        })

        res.status(200).json({
            status: 'success',
            msg: 'create review successfully',
            data: {
                review
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