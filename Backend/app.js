const express = require('express')
const app = express()
const  connectDB  = require('./db/connect.js');
const cors  = require("cors");

const userRoutes=require("./Routes/router.js")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/user",userRoutes)

connectDB();

app.get("/",(req,res)=>{
  res.status(201).json("server start")
})



app.listen(8080,()=>{
    console.log(`server Listen to port ${8080}`)
})