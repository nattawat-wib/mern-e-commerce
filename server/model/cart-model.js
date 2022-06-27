const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'member',
        required: true,
        unique: true,
    },
    itemList: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'product',
                    required: true
                },
                amount: {
                    type: Number,
                    required: true
                },
                totalPrice: {
                    type: Number,
                    required: true                    
                }
            }
        ],
    },
    totalProduct: {
        type: Number,
        required: true
    },
    totalPrice: {
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

cartSchema.pre('save', async function (next) {
    this.updatedAtDateTime = new Date(this.updatedAt).toLocaleString('en-GB').split(', ').join(' ');
    this.updatedAtTimestamp = new Date(this.updatedAt).getTime();
    // this.updatedAtTimestamp = 'awd'

    if (this.isNew) {
        this.createdAtDateTime = this.updatedAtDateTime
        this.createdAtTimestamp = this.updatedAtTimestamp
    }
})

module.exports = mongoose.model('cart', cartSchema);