const mongoose=require("mongoose")
require("dotenv").config()

const Mongo_Url=process.env.MONGO_URL;

//tKnGAN9y8NK9qZeg

const connectDB=async()=>{
    try{
       await mongoose.connect(Mongo_Url);
       console.log("Connection Sucessfully")
    }catch(e){
        console.log(e)
        console.log("Failed to Connect")
    }
}

module.exports= connectDB
