const jwt = require('jsonwebtoken') 

const auth = async(req , res , next)=>{
    try{
        
        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message : "Token missing , please login again"
            })
        }

        const decoded = jwt.verify(token ,  process.env.SECRET_KEY)
        
        req.userid = decoded.id ;
        next() ;
    }catch(err){
        return res.status(500).json({
            message : err.message 
        })
    }
}

module.exports = {auth} ;