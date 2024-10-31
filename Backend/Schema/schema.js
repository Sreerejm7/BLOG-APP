const mongoose = require('mongoose')

const  userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone:{
    type:String,
    required:true
  },
  password: {
    type: String,
    required: true,
  },
})


const postSchema = new mongoose.Schema({
  userId:{
    type:String
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    ref:'Users',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Users = mongoose.model('Users', userSchema);
const Post = mongoose.model('Post',postSchema)


module.exports = {Users,Post}