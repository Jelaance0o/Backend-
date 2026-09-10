const express = require("express")
const authRouter = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")
const app = express()
app.use(express.json())
app.use(cookieParser())



app.use("/api/auth", authRouter) // if i want to hit the resgister || i have to use /api/auth ==> we can change it can use mama nana chacha 


module.exports = app