const Member = require('./../model/member-model');
const cleanForm = require('../util/clean-form');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        cleanForm(req.body, ['firstName', 'lastName', 'email', 'tel', 'password', 'passwordConfirm']);

        const isEmailExist = await Member.findOne({ email: req.body.email });
        if (isEmailExist) throw 'this email is already taken';

        if (req.body.password !== req.body.passwordConfirm) {
            throw 'password and password confirm should be match'
        }

        const newMember = await Member.create(req.body);

        const token = jwt.sign({ username: newMember.username }, process.env.JWT_SECRET);
        newMember.accessToken = token;
        await newMember.save();

        res
            .status(200)
            .cookie('accessToken', token, {
                httpOnly: true,
            })
            .json({
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

exports.login = async (req, res) => {
    try {
        const member = await Member.findOne({ email: req.body.email });
        if (!member) throw 'password or email is not correct';

        if(!await member.isPasswordCorrect(req.body.password, member.password)) {
            throw 'password or email is not correct'
        }

        const token = jwt.sign({ username: member.username }, process.env.JWT_SECRET);
        member.accessToken = token;
        await member.save();

        res
            .status(200)
            .cookie('accessToken', token, {
                httpOnly: true,
            })
            .json({
                status: 'success',
                msg: 'logout successfully',
                data: {
                    member
                }
            });

    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        });
    }
}

exports.logout = async (req, res) => {
    try {
        const member = await Member.findOne({ accessToken: req.cookies.accessToken });
        if (!member) throw 'no member login with this token';

        member.accessToken = undefined;
        await member.save();

        res
            .clearCookie('accessToken')
            .status(200)
            .json({
                status: 'success',
                msg: 'logout successfully',
                data: {
                    member
                }
            });

    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        });
    }
}

exports.verityToken = async (req, res) => {
    try {
        if (!req.cookies.accessToken) throw 'token not found';

        const member = await Member.findOne({ accessToken: req.cookies.accessToken });

        if (!member) throw 'member not found with this access token';

        res.status(200).json({
            status: 'success',
            msg: 'this user is already login',
            data: {
                member
            }
        });

    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        });
    }
}

exports.getLoginMember = async (req, res, next) => {
    try {
        const member = await Member.findOne({ accessToken: req.cookies.accessToken });

        req.member = member;
        next()
    } catch (err) {
        console.log(err);
        next()
    }
}


exports.loginCp = async (req, res) => {
    try {
        if(req.body.username !== 'admin' || req.body.password !== '123456') {
            throw 'username or password is not correct';
        }

        res.status(200).json({
            status: 'success',
            msg: 'login successfully',
        });

    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'error',
            msg: err
        });
    }
}