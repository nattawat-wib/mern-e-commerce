const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    subDistrict: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },
    detail: {
        type: String,
        required: true
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
        type: String,
        select: false
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

addressSchema.pre('save', async function (next) {
    this.updatedAtDateTime = new Date(this.updatedAt).toLocaleString('en-GB').split(', ').join(' ');
    this.updatedAtTimestamp = new Date(this.updatedAt).getTime();
    // this.updatedAtTimestamp = 'awd'

    if (this.isNew) {
        this.createdAtDateTime = this.updatedAtDateTime
        this.createdAtTimestamp = this.updatedAtTimestamp
    }
})

module.exports = mongoose.model('address', addressSchema);