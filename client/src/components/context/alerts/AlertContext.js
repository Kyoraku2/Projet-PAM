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
      const timerElement = document.querySelector('.alert__timer');
      let i = 0;
      if (i === 0) {
        i = 1;
        var width = 1;
        var id = setInterval(frame, 10);
        function frame() {
          if (width >= 100) {
            clearInterval(id);
            i = 0;
          } else {
            // Incrementing width depending on TIME_TO_HIDE
            width += 100 / (TIME_TO_HIDE / 10);
            timerElement.children[0].style.width = width + "%"; 
          }
        }
      }
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
