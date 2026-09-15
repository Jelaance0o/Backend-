const mongoose = require('mongoose')

async function connectTODB() {
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Database connected");
        
    })
    
}

module.exports = connectTODB