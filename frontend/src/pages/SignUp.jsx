import React, { useContext, useRef, useState } from 'react';
import { dataContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
let navigate = useNavigate()
let {serverUrl,userData,setUserData,getUserdata} =useContext(dataContext)
let [firstName,setFirstName] =useState("")
let [lastName,setLastName] =useState("")
let [email,setEmail] =useState("")
let [userName,setUserName] =useState("")
let [password,setPassword] =useState("")
let file = useRef(null)

const handleSignUP = async (e) => {
  e.preventDefault()
  try {

let formdata= new FormData()
formdata.append("firstName",firstName)
formdata.append("lastName",lastName)
formdata.append("email",email)
formdata.append("userName",userName)
formdata.append("password",password)
if(backendImage){
  formdata.append("profileImage",backendImage)
}
    let {data} =await axios.post(serverUrl + "/api/signup",formdata
      , {
      withCredentials: true,
      headers:{"Content-Type":"multipart/form-data"}
    })
   await getUserdata()
    setUserData(data.user)
 navigate("/")
   
  } catch (error) {
    console.error("Error during sign up:", error);
  }
}

let [frontendImage,setFrontendImage] = useState(null)
let [backendImage,setBackendImage] = useState(null)
function handleImage(e){
 let file = e.target.files[0]
 setBackendImage(file)
 let image = URL.createObjectURL(file)
 setFrontendImage(image)
}


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

    

      <form className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSignUP}>
       
       
       <input type="file" hidden ref={file} onChange={handleImage}/>
        {/*Profile Image Circle */}
      <div className="mb-6">
        <div className="cursor-pointer w-28 h-28 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center shadow-md">
          {/* Replace the src with any default image URL */}
          <img
            src={frontendImage}
            alt="Profile"
            className="object-cover w-full h-full"
            onClick={()=>{file.current.click()}}
          />
        </div>
      </div>

        
        {/* First and Last Name - side by side */}
        <div className="flex gap-4 mb-4">
          <input
          onChange={(e)=>setFirstName(e.target.value)}
            value={firstName}
            type="text"
            placeholder="First Name"
            className="w-1/2 px-3 py-2 border rounded"
          />
          <input
          onChange={(e)=>setLastName(e.target.value)}
            value={lastName}
            type="text"
            placeholder="Last Name"
            className="w-1/2 px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <input
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <input
            onChange={(e)=>setUserName(e.target.value)}
            value={userName}
            type="text"
            placeholder="Username"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-6">
          <input
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </button>
        <p className='text-black'>Already have an account ? <span onClick={()=>navigate("/login")} className='text-blue-600 cursor-pointer'>Login</span></p>
      </form>
    </div>
  );
};

export default SignUp;
