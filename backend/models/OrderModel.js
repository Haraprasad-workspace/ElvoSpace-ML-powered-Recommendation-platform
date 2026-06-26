const mongoose = require('../configuration/mongoose_config')

const OrderSchema = mongoose.Schema(
    {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },

        quantity: {
          type: Number,
          required: true,
          default: 1,
        },

        priceAtPurchase: {
          type: Number,
          required: true,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },

    totalProducts: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Order' , OrderSchema)