const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    username: String,
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    tel: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    shippingAddressList: {
        type: [mongoose.Schema.Types.ObjectId],
    },
    shippingAddressDefault: {
        type: mongoose.Schema.Types.ObjectId
    },
    accessToken: {
        type: String,
    },
    accessTokenCp: {
        type: String,
    },
    createdAt: {
        type: Date
    },
    createdAtDateTime: {
        type: String
    },
    createdAtTimestamp: {
        type: Number
    },
    updatedAt: {
        type: Date
    },
    updatedAtDateTime: {
        type: String
    },
    updatedAtTimestamp: {
        type: Number
    }
})

module.exports = mongoose.model('member', memberSchema)