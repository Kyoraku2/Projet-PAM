import {createContext, useEffect, useState} from "react";
import {getCookie} from "../../utils/functions";
import {COOKIE_USER_KEY} from "../../utils/consts";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    let authFromCookie = getCookie(COOKIE_USER_KEY);
    if(authFromCookie?.accessToken && !auth.accessToken){
      setAuth({
        username:authFromCookie.username,
        accessToken: authFromCookie.accessToken,
        id:authFromCookie.id
      });
    }
  }, [auth, setAuth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;