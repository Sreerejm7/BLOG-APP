const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {Users,Post} = require('../Schema/schema.js')


const Register=async function (req,res) {
  const{name,phone,email,password}=req.body
  if(!name||!phone||!email||!password)
  {
      return res.status(400).json({message:"Please Fill All The Feilds"})
  }
  try {
      const isregistered=await Users.findOne({email})
      if(isregistered)
      {
          return res.status(400).json({message:"User Already Exists"})
      }
      const hashedpassword= await bcrypt.hash(password,10)
      const newuser=await Users.create({
          name,phone,email,password:hashedpassword
      })
      return res.status(200).json({message:"User Registered Successfully",user:newuser})
  } catch (error) {
      return res.status(500).json({message:"Unexpected Error Occured",error:error.message})
  }
}

const Login = async (req,res)=>{
  const {email,password}= req.body
  if(!email || !password) {
    return res.status(400).json({message:"Please Fill All The Feilds"})
  }
  try {
    const isRegistered = await Users.findOne({email})
    if(!isRegistered){
      return res.status(400).json({
        message:"User Not Found!"
      })
    }
    const isMatched=await bcrypt.compare(password,isRegistered.password)
            if(!isMatched)
            {
                return res.status(400).json({message:"Password Incorrect"})
            }
            const token = jwt.sign({_id:isRegistered.id},process.env.SECURITY_KEY)
            return res.status(200).json({message:"Login Successfull",user:isRegistered,token})
        } catch (error) {
            return res.status(500).json({message:"Unexpected Error Occured",error:error.message})
        }
}


const createPost=async function (req,res) {
  const{ author,title,content,createdAt,updatedAt}=req.body
  const id=req.user._id
  if(!author||!title||!content)
  {
      return res.status(400).json({message:"Please Fill All The Details"})
  }
  try {
      const blog=await Post.create({
          author,title,content,createdAt,updatedAt,userId:id
      })
      return res.status(200).json({message:"Blog Posted Successfully",blog})
  } catch (error) {
      return res.status(500).json({message:"Unexpected Error Occured",error:error.message})
  }
}

const updatePost = async (req,res)=>{
  const {id} = req.params
  const {title,content,updatedAt} = req.body
  if(!title || !content){
    return res.status(200).json({message:"Requested Post is not Available.."})
  }
  try {
    const post = await Post.findByIdAndUpdate(id,{title,content,updatedAt:Date.now()},{new:true})
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    return res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    return res.status(500).json({ message: "Error updating post", error });
  }
};


const getUserPostById = async (req, res) => {
  const { id } = req.params; 
  const userid = req.user._id; 

  try {
    const post = await Post.findOne({ _id: id, userId: userid }); 
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }
    return res.status(200).json({ message: "Post retrieved successfully", post });
  } catch (error) {
    return res.status(500).json({ message: "Unexpected Error Occurred", error: error.message });
  }
};





const deletePost = async (req,res)=>{
  const {id}= req.params
  try {
    const post = await Post.findByIdAndDelete(id)
    if(!post){
      return res.status(400).json({message:"Post Not Found!"})
    }
    return res.status(200).json({message:"Post Deleted Sucessfully"})
  } catch (error) {
    return res.status(500).json({ message: "Error deleting post", error });
  }
}

const getAllPost = async (req,res)=>{
  try {
    const post = await Post.find({})
    if(!post){
      return res.status(400).json({message:"No Posts!"})
    }
    return res.status(200).json({message:"Posts:",post})
  } catch (error) {
    return res.status(400).json({message:"Error while Showing Posts"})
  }
}


const getUserPosts = async function (req, res) {
  const userid = req.user._id; 

  try {
      const results = await Post.find({ userId: userid }); 
      if (results.length === 0) {
          return res.status(404).json({ message: "No Blogs Found" });
      }
      return res.status(200).json({ message: "Blogs retrieved successfully", results });
  } catch (error) {
      return res.status(500).json({ message: "Unexpected Error Occurred", error: error.message });
  }
};






module.exports = {Register,Login,createPost,updatePost,deletePost,getAllPost,getUserPosts,getUserPostById }