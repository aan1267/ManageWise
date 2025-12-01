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



module.exports = {userSchema};