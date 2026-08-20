const { default: mongoose } = require("mongoose")

function connectToDB(){
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log("Database Connected");
    });
}
module.exports = connectToDB