const Member = require('./../model/member-model');

exports.register = async (req, res) => {
    try {
        console.log("req.body", req.body);

        res.status(200).json({
            status: 'success',
            msg: 'register successfully'
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            msg: error
        })
    }
}