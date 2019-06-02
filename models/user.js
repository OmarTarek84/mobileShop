const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    googleId: {
        type: String
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    createdMobiles: [{
        type: Schema.Types.ObjectId,
        ref: 'Mobile'
    }],
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Cart' 
    }],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }]
});

module.exports = mongoose.model('User', userSchema);