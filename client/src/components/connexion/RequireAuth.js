import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import jwt from "jwt-decode";
import {getCookie} from "../../utils/functions";
import {COOKIE_USER_KEY} from "../../utils/consts";

const RequireAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const location = useLocation();
  const [checked, setChecked] = useState(false);


  useEffect(() => {
    let authFromCookie = getCookie(COOKIE_USER_KEY);
    if(authFromCookie?.accessToken && !auth.accessToken){
      setAuth({
        username:authFromCookie.username,
        accessToken: authFromCookie.accessToken,
        id:authFromCookie.id
      });
    }

    if(auth.accessToken !== undefined){
      const exp = jwt(auth.accessToken).exp;
      if(Date.now() >= exp * 1000){
        setAuth({});
        console.log("logout")
      }
    }
    setChecked(true);
  }, [auth, setAuth, setChecked]);

  return (
    checked?
      (auth.accessToken !== undefined)
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />
      :
      <></>
  );
}

export default RequireAuth;