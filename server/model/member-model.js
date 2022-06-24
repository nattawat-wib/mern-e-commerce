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
        ref: 'address'
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
},{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

const memberModel = mongoose.model('member', memberSchema);

memberSchema.pre('save', async function() {
    console.log('test');
    // if(this.isNew) {
        const uniqueUsername = Math.random().toString(32).slice(2);
        
        const testuser = await memberModel.find({firstName: 'nutella'})
        // this.username 
        console.log('testuser', testuser);
        console.log('uniqueUsername', uniqueUsername);
    // }
})

module.exports = memberModel