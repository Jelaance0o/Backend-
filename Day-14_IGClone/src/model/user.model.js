const mongoose = require('mongoose')


const useSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already exist"],
    required: [true, "username is required"],
  },
  email: {
    type: String,
    unique: [true, "email already exist"],
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  bio: String,
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/c3pdk6uzm/user-profile.jpg?updatedAt=1789107205372",
  },
});

const userModel = mongoose.model("users", useSchema)

module.exports = userModel;