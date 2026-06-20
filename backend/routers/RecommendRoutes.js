const express = require('express')
const router = express.Router()


const RecommendController = require("../controllers/RecommendController")

router.post("/product" , RecommendController.getProductRecommendation)
router.post("/Search" , RecommendController.getSearchRecommendation)
router.get('/home' , RecommendController.getHomeProducts)
module.exports = router