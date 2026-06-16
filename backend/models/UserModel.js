const mongoose = require("../configuration/mongoose_config")

const UserSchema = mongoose.Schema({
    providerId : {
        type:String , enum:["Google" , "Local"] , default:"Local" ,  required:false
    },
    name :{
        type:String , required:true , default:"User"
    } ,
    email : {
        type: String , required:true  , unique : true
    } ,
    password : {
        type:String , required:true
    } ,
    phoneNumber:{
        type:String , required:true
    }
} , {timestamps: true})

module.exports = mongoose.model("User" , UserSchema);