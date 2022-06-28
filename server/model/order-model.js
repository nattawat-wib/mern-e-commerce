const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'member',
        required: true
    },
    address: {
        type: {
            _id: String,
            name: String,
            tel: String,
            province: String,
            district: String,
            subDistrict: String,
            zipCode: String,
            detail: String,
        },
        required: true
    },
    productList: {
        type: [
            new mongoose.Schema({
                product: {
                    _id: String,
                    name: String,
                    category: String,
                    price: Number,
                    skuId: String,
                    thumbnail: String
                },
                amount: Number,
                totalPrice: Number
            })],
        required: true
    },
    totalProduct: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    deliveryPrice: {
        type: String,
        required: true
    },
    note: String,
    status: String,
    transaction: {
        type: {
            balance: Number,
            transferTo: String,
            slip: String,
            dateTime: String
        },
    },
    paymentConfirmAt: Number,
    paymentConfirmAtDateTime: String,
    shippingConfirmAt: Number,
    shippingConfirmAtDateTime: String,
    shippingDetail : {
        provider: String,
        deliveryPrice: Number,
        trackingId: String,
    },
    cancelAt: {
        type: {
            dateTime: String,
            timestamp: Number
        }
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