const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
orderSchema.pre('save', async function (next) {
    this.updatedAtDateTime = new Date(this.updatedAt).toLocaleString('en-GB').split(', ').join(' ');
    this.updatedAtTimestamp = new Date(this.updatedAt).getTime();
    // this.updatedAtTimestamp = 'awd'

    if (this.isNew) {
        this.createdAtDateTime = this.updatedAtDateTime
        this.createdAtTimestamp = this.updatedAtTimestamp
    }
})

module.exports = mongoose.model('order', orderSchema);