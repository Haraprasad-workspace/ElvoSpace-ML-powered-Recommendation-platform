const mongoose = require('../configuration/mongoose_config')

const CartModel = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    products: [
        {
            productId: {
                type: String,
                required: true
            },

            quantity: {
                type: Number,
                default: 1
            }
        }
    ],

    totalAmount: {
        type: Number,
        default: 0
    },

    totalProducts: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
}
)

module.exports = mongoose.model('Cart' , CartModel);