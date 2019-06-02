const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    order: [{
        mobile: {
            type: Object,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);