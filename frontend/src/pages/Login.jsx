import React, { useContext, useState } from 'react'
import { dataContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Login = () => {
 let navigate = useNavigate()
 let {serverUrl,userData,setUserData,getUserdata} =useContext(dataContext)
 let [email,setEmail] = useState("")
 let [password,setPassword] = useState("")
 

 const handleLogin = async (e) => {
    e.preventDefault()
    try {
      let {data}= await axios.post(serverUrl + "/api/login", {
        email,
        password
      }, {
        withCredentials: true 
      })

    setUserData(data.user)
      await getUserdata()
 
     console.log(data)
      if(userData){
 navigate("/")
    }
   
    } catch (error) {
      alert(error.response.data.message);
    }
 }

 
   return ( 
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
       <h1 className="text-3xl font-bold mb-6">Login</h1>
 
 
       <form className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleLogin}>
 
         <div className="mb-4">
           <input
             onChange={(e)=>setEmail(e.target.value)}
             value={email}
             type="email"
             placeholder="Email"
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
           Login
         </button>
                 <p className='text-black'>Don't have an account ? <span onClick={()=>navigate("/signup")} className='text-blue-600 cursor-pointer'>Signup</span></p>

       </form>
     </div>
   );
}

export default Login