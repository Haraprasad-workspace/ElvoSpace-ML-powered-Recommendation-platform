
const Products = require("../models/ProductModel")


const getSearchRecommendation = async (req , res )=>{
    try{
        const keyword = req.body ;

        const response = await fetch(`${process.env.ML_DOMAIN}/api/recommend/search` , {
            method : "POST" ,
            headers : {
                'Content-Type' : 'application/json'
            } ,
            body : JSON.stringify(keyword)
        })

        const data = await response.json()

        if(!response.ok){
            return res.status(500).json({
                message : "some error occured in the ML recommendation engine"
            })
        }

        return res.status(200).json({
            success : true ,
            data : data.data
        })


    }catch(err){
        return res.status(500).json({
            message : err.message
        })
    }
}

const getProductRecommendation = async (req , res )=>{
    try{
        const ProductId = req.body ;

        const response = await fetch(`${process.env.ML_DOMAIN}/api/recommend/product` , {
            method : "POST" ,
            headers : {
                'Content-Type' : 'application/json'
            } ,
            body : JSON.stringify(ProductId)
        })

        const data = await response.json()

        if(!response.ok){
            return res.status(500).json({
                message : "some error occured in the ML recommendation engine"
            })
        }

        return res.status(200).json({
            success : true ,
            data : data.data
        })


    }catch(err){
        return res.status(500).json({
            message : err.message
        })
    }
}

const getHomeProducts = async(req , res)=>{
    try{
        const [
                under500,
                premiumProducts,
                headphones,
                appliances , 
                Trending , 
                TopRated 
        ] = await Promise.all([
                Products.aggregate([
                    { $match: { discount_price: { $lte: 500 } } },
                    { $sample: { size: 20 } }
                ]),
                Products.aggregate([
                    { $match: { discount_price: { $gte: 3000 } } },
                    { $sample: { size: 20 } }
                ]),
                Products.aggregate([
                    { $match: { main_category : "headphones" } },
                    { $sample: { size: 20 } }
                ]),
                Products.aggregate([
                    { $match: { main_category : "appliances" } },
                    { $sample: { size: 20 } }
                ]),
                Products.find().sort({ no_of_ratings: -1 }).limit(20) ,
                Products.find().sort({ ratings: -1 }).limit(20) ,
                
            ]);

        return res.status(200).json({
            success : true , 
            data :{
                under500 , premiumProducts , trendingHeadphones:headphones , topAppliances:appliances 
                , Trending , TopRated
            }
        })
    }
    catch(err){
        return res.status(500).json({
            message : err.message
        })
    }
}

module.exports = {getSearchRecommendation , getProductRecommendation , getHomeProducts}