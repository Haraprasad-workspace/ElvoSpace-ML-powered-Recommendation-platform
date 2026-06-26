const express = require('express')
const router = express.Router()

const authmiddleware = require('../middlewares/auth.middleware')
const CartController = require('../controllers/CartController')
const CartModel = require('../models/CartModel')

router.get("/viewCart" , authmiddleware.auth , CartController.ViewCart)
router.post("/AddtoCart" , authmiddleware.auth , CartController.addToCart)
router.post("/DeleteFromCart" , authmiddleware.auth , CartController.DeleteFromCart)


module.exports = router 