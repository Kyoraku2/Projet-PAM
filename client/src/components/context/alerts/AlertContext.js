import {createContext, useEffect, useState} from "react";

const AlertContext = createContext(null);

export const AlertProvider = ({children}) => {
  const [alert, setAlert] = useState(null);
  const TIME_TO_HIDE = 5000;

  useEffect(() => {
    // Getting "alert" from DOM
    const alertElement = document.querySelector('.alert');
    // Setting timer and updating "alert__timer" width
    if(alertElement !== null && alert !== null) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, TIME_TO_HIDE);
      // TODO : maybe animate the timer width
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <AlertContext.Provider value={{alert, setAlert}}>
      {children}
    </AlertContext.Provider>
  );
}

export default AlertContext;
