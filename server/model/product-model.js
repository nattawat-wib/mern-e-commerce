const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    thumbnail: {
        type: String,
        required: true
    },
    imageList: {
        type: [String],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    skuId: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
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

productSchema.pre('save', function (next) {
    if (!this.isNew) next();

    const timestamp = new Date(this.createdAt).getTime();
    const dateTime = new Date(this.createdAt).toLocaleString('en-GB').split(', ').join(' ');

    this.createdAtTimestamp = timestamp;
    this.createdAtDateTime = dateTime;
    this.updatedAtTimestamp = timestamp;
    this.updatedAtDateTime = dateTime;

    next();
})

module.exports = mongoose.model('product', productSchema)