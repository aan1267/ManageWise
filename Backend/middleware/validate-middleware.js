const { userSchema } = require("../validations/userValidation.js");

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error)
    return res.status(400).json({ success: false, msg: error.details[0].message });
  next();
};

module.exports = { validateUser };
