const express = require('express')
const router = express.Router()

const authmiddleware = require('../middlewares/auth.middleware')

const UserProfileController = require('../controllers/UserProfileController')

router.get('/profile' , authmiddleware.auth , UserProfileController.profile )

module.exports = router ; 