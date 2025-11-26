const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig.js")

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "Mern-images",
    }
  });

const upload = multer({ storage: storage });

module.exports = upload