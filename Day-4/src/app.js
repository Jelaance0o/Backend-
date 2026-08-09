// Server Create and server config in app.js


const express = require("express")

const app = express()

app.use(express.json())

const notes = []

app.post("/notes",(req,res)=>{
    notes.push(req.body)      //data we get from frontend

    console.log(notes);    
    
    res.send("note created");      //data send to postmen in respond
})

app.get("/notes",(req,res)=>{
    res.send(notes)
})

app.delete("/notes/:index",(req,res)=>{  //dynamic value
    console.log(req.params.index);
    delete notes[req.params.index];  //nothing ia delete in backend
    res.send("note deleted")
    console.log(notes);  
})

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description
    notes[req.params.index].title = req.body.title

    res.send("note updated succesfully")
})
module.exports = app
