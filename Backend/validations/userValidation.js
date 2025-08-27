const Joi = require("joi")


const userSchema = Joi.object({
    fname :  Joi.string().required(),
    lname :  Joi.string().required(),
    email :  Joi.string().email().required(),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
    gender: Joi.string().valid("male", "female").required(),
    status: Joi.string().valid("Active", "Inactive").optional(),
    location: Joi.string().required(),
})

const validateUser = (req,res,next)=>{
     const {error} = userSchema.validate(req.body);
     if(error) res.status(400).json({success:false,msg:error.details[0].message})
     next();
}

module.exports = {validateUser}