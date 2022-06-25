const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const memberSchema = new mongoose.Schema({
    username: {
        type: String,
        default: null
    },
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
    shippingAddressDefault: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
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

memberSchema.methods.isPasswordCorrect = async function(candidatePassword, oldPassword) {
    return await bcrypt.compare(candidatePassword, oldPassword)
}

const memberModel = mongoose.model('member', memberSchema);
module.exports = memberModel