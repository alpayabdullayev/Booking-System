import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("username") || null);
  const [userT,setUserT] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [userId, setuserId] = useState(localStorage.getItem("userId") || null);

  useEffect(() => {
    if(token){
      try {
        const decodeToken = jwtDecode(token)
        setUserT(decodeToken)
      } catch (error) {
        console.error("INvalid token",error.message)
        setUserT(null)
      }
    }
  }, [token])
  

  const data = { user, setUser, role, setRole, token, setToken,userId,setuserId,userT,setUserT };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
