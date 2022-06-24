const Member = require('./../model/member-model');

exports.register = async (req, res) => {
    try {
        const newMember = await Member.create(req.body);

        res.status(200).json({
            status: 'success',
            msg: 'register successfully'
        })

    } catch (error) {
        console.log(error);

        res.status(400).json({
            status: 'error',
            msg: error
        })
    }
}