const Users = require("../models/usersSchema");
const { cloudinary } = require("../multerconfig/cloudinaryConfig");

//register user
const registerUser = async (req, res) => {
  const { fname, lname, email, gender, location, status, mobile } = req.body;
  //    console.log(fname,email,lname)
  //    console.log(gender)
  console.log(req.file);
  if (
    !fname ||
    !lname ||
    !email ||
    !gender ||
    !location ||
    !status ||
    !mobile
  ) {
    return res.status(401).json({ message: "All Input fields is required" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Profile image is required." });
  }

  try {
    const user = await Users.findOne({ email: email });

    if (user) {
      return res.status(401).json("This user already exist in our database");
    }

    let cloudResponse = null;
    if (req.file) {
      const file = req.file;
      cloudResponse = await cloudinary.uploader.upload(file.path);
    }

    const newUser = new Users({
      fname,
      lname,
      email,
      gender,
      location,
      status,
      mobile,
      profile: cloudResponse.secure_url,
    });

    //  Save the user in the database
    const savedUser = await newUser.save();
    return res
      .status(201)
      .json({ message: "User registered sucessfully !", user: savedUser });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "server error", e });
  }
};

// get all users
const getallUsers = async (req, res) => {
  try {
    const {
      search = "",
      gender,
      status,
      sort = "",
      // page = 1,
      // limit = 5,
    } = req.query;

    console.log(req.query);
    console.log(search);
    console.log(gender);

    const query = {};

    if (search) {
      query.fname = { $regex: search, $options: "i" };
    }

    if (gender && gender !== "All") {
      query.gender = gender;
    }

    if (status && status !== "All") {
      query.status = status;
    }

    // const pageNumber = parseInt(page) 
    // const limitNumber = parseInt(limit) 

    // sort
    const sortOrder = sort == "new" ? -1 : 1;
    const users = await Users.find(query)
    .sort({ createdAt: sortOrder })
    // .skip((pageNumber-1)* limit) //skips already fetched items.
    // .limit(limitNumber)

    // const  total = await Users.countDocuments(query)

    res.status(200).json({
      success: true,
      users,
    });
  } catch (e) {
     console.log(e);
     res.status(500).json({msg:"server error"})
  }
};

//single user
const singleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userdata = await Users.findById(id);
    res.status(200).json(userdata);
  } catch (e) {
    res.status(401), json({ message: "Error fetching user", error: e.message });
  }
};

//edit user
const editUser = async (req, res) => {
  const { id } = req.params;
  const { fname, lname, email, gender, location, status, mobile, profile } =
    req.body;
  const file = req.file ? req.file.path : profile;

  try {
    const updateUser = await Users.findByIdAndUpdate(
      id,
      {
        fname,
        lname,
        email,
        mobile,
        gender,
        status,
        location,
        profile: file,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ updateUser });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

//findByIdAndUpdate automatically updates the document and saves it to the database.

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteuser = await Users.findByIdAndDelete(id);
    res.status(200).json({ deleteuser });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// change status
const userstatus = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    const changestatus = await Users.findByIdAndUpdate(
      id,
      { status: data },
      { new: true, runValidators: true }
    );
    res.status(200).json({ changestatus });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

module.exports = {
  registerUser,
  getallUsers,
  singleUser,
  editUser,
  deleteUser,
  userstatus,
};

// json data key value pairs me hota he
