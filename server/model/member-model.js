const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const memberSchema = new mongoose.Schema({
    username: {
        type: String,
        default: null
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    addressDefault: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
    },
    accessToken: {
        type: String,
        select: false
    },
    accessTokenCp: {
        type: String,
        select: false
    },
    createdAt: {
        type: Date,
        select: false
    },
    createdAtDateTime: {
        type: String
    },
    createdAtTimestamp: {
        type: Number,
        select: false
    },
    updatedAt: {
        type: Date,
        select: false
    },
    updatedAtDateTime: {
        type: String
    },
    updatedAtTimestamp: {
        type: Number,
        select: false
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

memberSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }

    if (!this.isNew) next();

    await (generateUsername = async () => {
        const username = Math.random().toString(32).slice(2);
        const existMember = await memberModel.findOne({ username });

        existMember ? generateUsername() : this.username = username
    })();

    const timestamp = new Date(this.createdAt).getTime();
    const dateTime = new Date(this.createdAt).toLocaleString('en-GB').split(', ').join(' ');

    this.createdAtDateTime = dateTime
    this.createdAtTimestamp = timestamp
    this.updatedAtDateTime = dateTime
    this.updatedAtTimestamp = timestamp
})

memberSchema.methods.isPasswordCorrect = async function (candidatePassword, oldPassword) {

    console.log(candidatePassword, oldPassword);
    return await bcrypt.compare(candidatePassword, oldPassword)
}

const memberModel = mongoose.model('member', memberSchema);
module.exports = memberModel