const express = require('express')
const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken")
const authRouter = express.Router()
const crypto = require("crypto")


authRouter.post('/register', async(req,res)=>{
    const {name , email , password } = req.body

    const isUserAlreadyExist = await userModel.findOne({email})

    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"User already exists with this email"
        })
    }
    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        email , password:hash, name 
    })

    const token = jwt.sign(
        {id: user._id,
        email: user.email
        },
        process.env.JWT_SECRET
    )
    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"user registered",
        user,
        token
    })
})

authRouter.post("/protected",(req,res)=>{
    console.log(req.cookies); 

    res.status(200).json({
        message: "This is protected route"
    }) 
    
})

authRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"User not found with this email address"
        })
    }

    const isPasswordMatch =
      user.password === crypto.createHash("md5").update(password).digest("hex");

    if(!isPasswordMatch){
        return res.status(401).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    },process.env.JWT_SECRET)

    res.cookie("jwt_token",token)

    res.status(200).json({
        message:"User logged in",
        user
    })
})

authRouter.get('/get-me' , async(req,res)=>{

    const token = req.cookies.token

    const decode = jwt.verify(token,process.env.JWT_SECRET)

    const user = await userModel.findById(decode.id)

    res.json({
        name:user.name,
        email:user.email
    })
})
    
module.exports = authRouter


// two things required to create token jwt and use data