import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const dataContext = createContext();

function UserContext({ children }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const serverUrl = "http://localhost:8000";

  const getUserdata = async () => {
    const token = localStorage.getItem("token"); // token saved at login

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.get(`${serverUrl}/api/getuserdata`, {
        headers: {
          Authorization: `Bearer ${token}`, // <-- send JWT here
        },
      });

      setUserData(data.user); // <-- update according to backend response

      if (!data.user) { // if user not found, redirect
        navigate("/login");
      }
    } catch (error) {
      console.log("Error fetching user:", error);
      navigate("/login"); // only redirect on real error
    }
  };

  useEffect(() => {
    getUserdata();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    getUserdata,
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}

export default UserContext;
