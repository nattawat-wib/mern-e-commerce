const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
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
            address: String,
        },
        required: true
    },
    productList: {
        type: [{
            _id: String,
            name: String,
            category: String,
            price: Number,
            skuId: String,
            thumbnail: String
        }],
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
            dateTime: String,
            balance: Number,
            evidence: String,
            transferTo: String
        },
    },
    paymentConfirmAt: {
        type: {
            dateTime: String,
            timestamp: Number
        }
    },
    shippingAt: {
        type: {
            dateTime: String,
            timestamp: Number
        }
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