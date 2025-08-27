const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: { 
    type: String, 
    required: true, 
    unique: true 
  },
  gender: {
    type: String,
    required: true,
  },
  location: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    required: true 
  },
  profile: { 
    type: String, 
    required: true 
  }, // Cloudinary URL
},{timestamps:true});

//collection
const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
