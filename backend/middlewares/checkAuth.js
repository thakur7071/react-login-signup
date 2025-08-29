import jwt from "jsonwebtoken"


export const checkAuth=(req,res,next)=>{
  try {
    let token=req.cookies.token
    if(!token){
        return res.status(401).json({message:"user is not authenticated"})
    }

   let decoded= jwt.verify(token,process.env.JWT_SECRET)
   req.userId=decoded.id
   next()
    
  } catch (error) {
    return res.status(500).json({message:"internal server error"})
    
  }
}


