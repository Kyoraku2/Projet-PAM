import React, {useContext, useEffect} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {deleteCookie, getCookie} from "../../utils/functions";
import {COOKIE_USER_KEY} from "../../utils/consts";
import AuthContext from "../context/AuthContext";

const Logout = () => {
  const { setAuth } = useContext(AuthContext);
  const location = useLocation();


  useEffect(() => {
    setAuth({});
    let authFromCookie = getCookie(COOKIE_USER_KEY);
    if(authFromCookie?.accessToken){
      deleteCookie(COOKIE_USER_KEY);
    }
  }, [setAuth]);

  return (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default Logout;