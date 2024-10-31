const express = require('express')
const route = express.Router()
const {Register,Login,createPost,updatePost,deletePost,getAllPost,getUserPosts,getUserPostById} = require('../Controller/controller')
const verifyToken = require('../middleware/middleware')


route.post("/register",Register)
route.post("/login",Login)
route.post("/post",verifyToken,createPost)
route.put("/update/:id",verifyToken,updatePost)
route.delete('/delete/:id',verifyToken,deletePost)
route.get('/getallpost',verifyToken,getAllPost)
route.get('/getuserposts',verifyToken,getUserPosts)
route.get('/getuserposts/:id',verifyToken, getUserPostById)


module.exports = route