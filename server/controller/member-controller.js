const Member = require('../model/member-model');
const cleanForm = require('./../util/clean-form');

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

exports.update = async (req, res) => {
    try {
        cleanForm(req.body, ['firstName', 'lastName', 'tel']);

        const member = await Member.findByIdAndUpdate(req.member._id, {
            ...req.body,
            avatar: req.file ? req.file.filename : req.body.avatar
        }, { new: true });

        res.status(200).json({
            status: 'success',
            msg: 'update member successfully',
            data: { member }
        })

    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        })
    }
}