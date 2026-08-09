const express = require("express")

const app = express()

app.get('/',(req ,res)=>{
    res.send("Hello World")
})

app.get('/home',(req ,res)=>{
    res.send("This is Home Page")
})

app.get('/about',(req ,res)=>{
    res.send("This is about")
})

app.listen(3000)