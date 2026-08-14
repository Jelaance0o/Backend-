const app = require("./src/app")
const mongoose = require("mongoose")


function connectToDB(){
    mongoose
      .connect(
        "mongodb://jeelanceroy_db_user:7xgTUVmHByJConsv@ac-pgarovl-shard-00-00.jnoa4gx.mongodb.net:27017,ac-pgarovl-shard-00-01.jnoa4gx.mongodb.net:27017,ac-pgarovl-shard-00-02.jnoa4gx.mongodb.net:27017/?ssl=true&replicaSet=atlas-m3aapp-shard-0&authSource=admin&appName=Cluster1/day-6",
      )
      .then(() => {
        console.log("Conencted to Database");
      });
}
connectToDB()
// 7xgTUVmHByJConsv


app.listen(3000,()=>{
    console.log("Server is running in port number 3000")
})