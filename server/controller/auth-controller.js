const Member = require('./../model/member-model');

exports.register = async (req, res) => {
    try {
        const newMember = await Member.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            tel: req.body.tel,
            password: req.body.password
        });

        res.status(200).json({
            status: 'success',
            msg: 'register successfully',
            data: {
                member: newMember
            }
        })

    } catch (error) {
        console.log(error);

        res.status(400).json({
            status: 'error',
            msg: error
        })
    }
}