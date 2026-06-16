const User = require("../models/UserModel")
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

        if(!user){
            return res.status(500).json({
                message:"some error encountered"
            })
        }

        const token = jwt.sign({id:user._id} , process.env.SECRET_KEY , {expiresIn : '24h'});

        return res.status(400).json({
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
            
            message : "Internal server error occured in the REGISTER controller"
        })
    }
}

module.exports = {login , register} ;