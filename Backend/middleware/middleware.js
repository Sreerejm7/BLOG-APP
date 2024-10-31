const jwt = require('jsonwebtoken')

const verifyToken = async(req,res,next)=>{
  const authHeader = req.headers.authorization;
  if(!authHeader){
    return res.status(400).json({message:"No Token Provided"})
  }

  const token = authHeader.split(" ")[1]

  jwt.verify(token,process.env.SECURITY_KEY,(err,decoded)=>{
    if(err){
      return res.status(400).json({message:"Authentication failed"})
    }
    else{
      req.user = decoded
      next()
    }
  })
}

module.exports = verifyToken