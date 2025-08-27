const express = require("express");
const router = new express.Router();
const {registerUser,getallUsers,singleUser,editUser,deleteUser,userstatus
} = require("../Controllers/userControllers.js");
const {upload} = require("../multerconfig/cloudinaryConfig.js");
const { validateUser } = require("../validations/userValidation.js");

router.post("/register", upload.single("profile"),validateUser, registerUser);
router.get("/details", getallUsers);
router.get("/:id", singleUser);
router.put("/edit/:id", upload.single("profile"),validateUser, editUser);
router.delete("/delete/:id", deleteUser);
// update status
router.put("/status/:id", userstatus);


// single users data => means id ***

module.exports = router;
