const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  const isAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isAlreadyExist) {
    return res.status(409).json({
      message:
        "user already exist" +
        (isAlreadyExist.email == email
          ? "Email already exist"
          : "Username Already Exist"),
    });
  }
  const hash = await bcrypt.hash(password,10)

  const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hash,
  });

  const token = jwt.sign(
    {
    id: user._id,
    },
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
);
res.cookie("token",token)
res.status(201).json({
    message:"User Registered Successfully",
    username:user.username,
    email:user.email,
    bio:user.bio
});
}

async function  loginController(req,res) {
  const{username,email,password ,} = req.body;

  const user = await userModel.findOne({
    $or :[{username:username} ,{email:email}]
  })  
  if (!user){
    return res.status(404).json({
      message:"User not found"
    })
  }

  const isPasswordValid = await bcrypt.compare(password,user.password)

  
  if (!isPasswordValid) {
    return res.status(404).json({
      message: "password invalid",
    });
  }
  
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token);

  res.status(200).json({
    message: "User LoggedIn Successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

module.exports = {
  loginController,
  registerController,
};
