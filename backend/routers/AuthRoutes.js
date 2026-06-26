const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')
const authmiddleware = require('../middlewares/auth.middleware')

router.post('/login' , AuthController.login)
router.post('/register' , AuthController.register)
router.get('/logout' , authmiddleware.auth , AuthController.logout)

module.exports = router ; 