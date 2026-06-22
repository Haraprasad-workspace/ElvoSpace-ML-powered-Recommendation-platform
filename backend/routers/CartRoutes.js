const express = require('express')
const router = express.Router()

const authmiddleware = require('../middlewares/auth.middleware')
const CartController = require('../controllers/CartController')
const CartModel = require('../models/CartModel')

router.get("/viewCart" , authmiddleware.auth , CartController.ViewCart)
router.post("/addToCart" , authmiddleware.auth , CartController.addToCart)
router.put("/deleteFromcart" , authmiddleware.auth , CartController.deleteFromCart)


module.exports = router 