const User = require('../models/UserModel')
const UserPrefence = require("../models/UserPrefenceModel")
const jwt = require('jsonwebtoken')

const profile = async(req , res)=>{
    try{

        const id = req.userid

        if(!id){
            return res.status(401).json({
                message : "the identifier token not found"
            })
        }

        const user = await User.findById(id);
        const userpreference = await UserPrefence.find({
            userId : id
        })

        if(!user || !userpreference){
            return res.status(401).json({
                message : "some collections are not available , server error"
            })
        }

        return res.status(200).json({
            success : true , 
            message : "succesfully fetched the user profile",
            UserProfileData : user ,
            UserPrefenceData : userpreference

        })


    }catch(err){
        return res.status(500).json({
            message : err.message
        })
    }
}

module.exports = {profile}