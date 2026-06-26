const User = require("../models/UserModel")
const UserPrefence = require("../models/UserPrefenceModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async (req , res)=>{
    try{

        const {email , password} = req.body ;
        const user = await User.findOne({
            email
        })

        if(!user){
            return res.status(400).json({
                message : "the Provided email Id does not exist , please first register yourself"
            })
        }

        const hashedPassword = user.password ;

        const ValidUser = await bcrypt.compare(password , hashedPassword);

        if(!ValidUser){
            return res.status(401).json({
                message : "Incorrect Password , please try again"
            })
        }

        const token = await jwt.sign({id:user._id} , process.env.SECRET_KEY , {expiresIn : '24h'})

        return res.status(200).json({
            message:"succesfully logged in" ,
            jwt_token : token  ,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })


    }catch(err){
        return res.status(500).json({
            message : "some internal server error occured at the LOGIN controller"
        })
    }
}

const register = async(req,res)=>{
    try{
        const {name , email , password , phoneNumber} = req.body ;

        if(!name || !email || !password || !phoneNumber){
            return res.status(400).json({
                message:"some details are missing , please fill out the complete form"
            })
        }

        // checking wheather the email already exist or not 

        const checkUser = await User.findOne({
            email
        })
    
        if(checkUser){
            return res.status(400).json({
                message:"The email already exist , please do Login"
            })
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const user = await User.create({
            name : name , 
            email: email,
            phoneNumber : phoneNumber ,
            password : hashedPassword
        })

        const userprefence = await UserPrefence.create({
            userId : user._id ,
            categoryScores : {
                "Ethnic Wear":0 , "Men's Fashion":0 , "All Appliances":0 ,"Home Entertainment Systems":0 ,"All Electronics":0 ,"Headphones":0 ,"Car Accessories":0 ,"Home Décor":0 
            } ,
            topSearchKeywords :[] ,
            totalSpending : 0 ,
            totalOrders : 0 ,
            categoryClickCounts : {
                "Ethnic Wear":0 , "Men's Fashion":0 , "All Appliances":0 ,"Home Entertainment Systems":0 ,"All Electronics":0 ,"Headphones":0 ,"Car Accessories":0 ,"Home Décor":0 
            } ,
            categoryCartCounts:{
                "Ethnic Wear":0 , "Men's Fashion":0 , "All Appliances":0 ,"Home Entertainment Systems":0 ,"All Electronics":0 ,"Headphones":0 ,"Car Accessories":0 ,"Home Décor":0 
            } ,
            categoryPurchaseCounts : {
                "Ethnic Wear":0 , "Men's Fashion":0 , "All Appliances":0 ,"Home Entertainment Systems":0 ,"All Electronics":0 ,"Headphones":0 ,"Car Accessories":0 ,"Home Décor":0 
            },
            totalTimeSpent : 0 ,
            categoryTimeSpent : {
                "Ethnic Wear":0 , "Men's Fashion":0 , "All Appliances":0 ,"Home Entertainment Systems":0 ,"All Electronics":0 ,"Headphones":0 ,"Car Accessories":0 ,"Home Décor":0 
            } 
        })

        if(!user){
            return res.status(500).json({
                message:"some error encountered"
            })
        }

        const token = jwt.sign({id:user._id} , process.env.SECRET_KEY , {expiresIn : '24h'});

        return res.status(200).json({
                message:"You have been succesfully registered" ,
                token : token ,
                user:{
                    id: user._id ,
                    name:user.name,
                    email : user.email
                }

        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            
            message : err.message
        })
    }
}

const logout = async(req , res)=>{
    try{
        return res.status(200).json({
            message :"Logout successfull"
        })
    }catch(err){
        return res.status(500).json({
            message : err.message
        })
    }
}

module.exports = {login , register , logout} ;