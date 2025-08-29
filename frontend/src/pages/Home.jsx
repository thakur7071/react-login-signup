import React, { useContext } from 'react'
import { dataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Home() {
    let{userData,setUserData,serverUrl}=useContext(dataContext)
    let navigate = useNavigate()
    if(!userData){
      navigate("/login")
    }

const handleLogout=async()=>{
  try {
    let { data } = await axios.post(serverUrl + "/api/logout", {}, { withCredentials: true })
console.log(data)
setUserData(null)

  } catch (error) {
    console.log(error)
  }
}


  return (
    <div className='w-full h-screen bg-[#0d1818] flex flex-col justify-center items-center gap-[20px]'>

     {/*Profile Image Circle */}
      <div className="mb-6">
        <div className="cursor-pointer w-28 h-28 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center shadow-md">
          <img
            src={userData.profileImage}
            alt="Profile"
            className="object-cover w-full h-full"
           
          />
        </div>
      </div>


       
<p className='text-white text-[20px]'>
  hey, <span className='text-[#0ce0e7] text-[25px] font-semibold'>{userData.firstName}</span>
</p>

      <button className='bg-[#07c7e4] text-black px-[10px] py-[5px] rounded-lg cursor-pointer ' onClick={handleLogout} >Logout</button>
    </div>
  )
}

export default Home
