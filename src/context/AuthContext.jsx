import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({children})=>{ //context provider
  const[token,setToken] = useState(localStorage.getItem("token")|| null);
  const  [userData,setUserData] = useState(null);
  
  const onLogin = ()=>{ //login function
    setToken("jwttoken");
    setUserData(user);

    localStorage.setItem("token","jwttoken");
  }

  const onLogout = ()=>{ //logout function
    setToken(null);
    setUserData(null);

    localStorage.removeItem("token");
  }

  return(
    <AuthContext.Provider value={{token,userData,onLogin,onLogout}}>
      {children}
    </AuthContext.Provider>
  )
}