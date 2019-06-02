const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    mobileId: {
        type: Schema.Types.ObjectId,
        ref: 'Mobile'
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Cart', cartSchema);