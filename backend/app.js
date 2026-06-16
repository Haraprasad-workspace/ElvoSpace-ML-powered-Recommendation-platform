require('dotenv').config()

const express = require('express')
const cors = require('cors')

const mongoose = require('./configuration/mongoose_config')
const AuthRoutes = require('./routers/AuthRoutes')
const app = express()
app.use(express.json())
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
)
app.use("/", AuthRoutes)
app.listen("3000" , ()=>{
    console.log("server listening on port 3000")
})