const Member = require('../model/member-model');

exports.getAll = async (req, res) => {
    try {

        const member = await Member.find();

        res.status(200).json({
            status: 'success',
            msg: 'all member',
            data: { member }
        })

    } catch (err) {
        res.status(400).json({
            status: 'error',
            msg: err
        })
    }
}