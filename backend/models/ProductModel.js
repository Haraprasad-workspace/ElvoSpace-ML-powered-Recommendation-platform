const mongoose = require("../configuration/mongoose_config")

const ProductSchema = mongoose.Schema(
    {
    productId: String,
    name: String,
    sub_category: String,
    main_category: String,
    image: String,
    link: String,
    discount_price: Number,
    actual_price: Number,
    ratings: Number,
    no_of_ratings: Number
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Products' , ProductSchema , "Products");