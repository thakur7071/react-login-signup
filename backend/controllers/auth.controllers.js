import generateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import uploadOnCloudinary from "../config/cloudinary.js";


export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, userName, password, email } = req.body;

    if (!firstName || !lastName || !userName || !password || !email) {
      return res.status(400).json({ message: "send all details" });
    }

let profileImage;
if(req.file){
profileImage=await uploadOnCloudinary(req.file.path)
}

    let existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hassedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hassedPassword,
      profileImage
    });


    let token;
    try {
     token = generateToken(user._id);
    } catch (error) {
        console.log(error)
    }
   

    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENVIRONMENT == "production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    }
    )

    return res.status(201).json({
      user: {
        firstName,
        lastName,
        userName,
        email,
        profileImage
      },
    });
  } catch (error) {
    return res.status(400).json(error);


  }
};


export const login  = async(req,res)=>{

try {
  const {email,password} = req.body
  let existUser = await User.findOne({email})
  if(!existUser){
    return res.status(400).json({message:"user does not exists"})
  }
  let match = await bcrypt.compare(password,existUser.password)
  if(!match){
    return res.status(400).json({message:"invalid credentials"})
  }

    let token;
    try {
     token = generateToken(existUser._id);
    } catch (error) {
        console.log(error)
    }
   
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENVIRONMENT == "production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    }
    )

    res.status(200).json({user:{
      firstName: existUser.firstName,
      lastName: existUser.lastName,
      userName: existUser.userName,
      email: existUser.email,
      profileImage: existUser.profileImage
    }})
  
} catch (error) {
      return res.status(400).json(error);

}

}


export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    return res.status(400).json(error);
  }
};



export const getUserData=async(req,res)=>{
    try {
        let userId=req.userId
        if(!userId){
            return res.status(400).json({message:"user id is not found"})
        }

        let user =await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        return res.status(200).json({user})

    } catch (error) {
        return res.status(500).json({message:error})
        
    }
}



