const express = require("express")
const app = express()
require('dotenv').config()
const mongoose = require('./database/db.js')
const route = require('./Route/route.js')
const cors = require('cors')

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors(
  origin='https://blog-app-frontend-ozpr.onrender.com'
))

port=process.env.PORT
app.use('/',route)



app.listen(port,()=>{
  console.log(`Server is Running on PORT ${port}`);
  
})