const Address = require('./../model/address-model');
const Member = require('./../model/member-model');
const cleanForm = require('./../util/clean-form');

exports.create = async (req, res) => {
    try {
        cleanForm(req.body, ['name', 'tel', 'province', 'district', 'subDistrict', 'zipCode', 'detail'])

        const address = await Address.create({
            owner: req.member._id,
            ...req.body
        });

        res.status(200).json({
            status: 'success',
            msg: 'create address successfully',
            data: {
                address
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

exports.getAll = async (req, res) => {
    try {
        const address = await Address.find({owner: req.member._id});

        res.status(200).json({
            status: 'success',
            msg: 'all address',
            data: {
                address
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

exports.delete = async (req, res) => {
    try {
        if (String(req.member.addressDefault._id) === req.params._id) throw 'cannot delete default address'

        await Address.findByIdAndDelete(req.params._id);

        res.status(200).json({
            status: 'success',
            msg: 'delete address successfully',
        })
    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        })
    }
}

exports.setDefault = async (req, res) => {
    try {
        const member = await Member
            .findByIdAndUpdate(req.member._id, {
                addressDefault: req.params._id
            }, { new: true }).populate('addressDefault', '-owner');

        res.status(200).json({
            status: 'success',
            msg: 'change default address successfully',
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


exports.update = async (req, res) => {
    try {
        cleanForm(req.body, ['name', 'tel', 'province', 'district', 'subDistrict', 'zipCode', 'detail'])

        const address = await Address.findByIdAndUpdate(req.params._id,
            { ...req.body },
            { new: true }
        );

        res.status(200).json({
            status: 'success',
            msg: 'edit address successfully',
            data: { address }
        })
    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        })
    }
}