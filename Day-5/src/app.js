const express = require("express");

const app = express();

app.use(express.json())

const notes = []

app.post("/notes",(req,res)=>{
    
    notes.push(req.body)
    console.log(req.body)
    res.status(201).json({
        message: "Note created successfully"  //actual use to send response messege
    })
})

app.get("/notes",(req,res)=>{
    res.status(200).json({
        notes:notes
    })
})

app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]

    res.status(204).json({
        message: "Notes deleted successfully" 
    })
})

module.exports = app;
