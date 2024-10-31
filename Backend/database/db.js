const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  console.log("Database Connected Sucessfully");
  
})
.catch(()=>{
  console.log("Database Connection Failed");
  
})

module.exports = mongoose