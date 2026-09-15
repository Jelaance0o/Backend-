const express = require("express");
const authController = require("../controllers/auth.controller")
const authRoter = express.Router(); //require when make routers outside app file


authRoter.post("/register", authController.registerController);

authRoter.post("/login",authController.loginController )

module.exports = authRoter;
 