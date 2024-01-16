import {createContext, useContext, useEffect, useState} from "react";
import axiosSpring from "../../../utils/axios/axiosSpring";
import AuthContext from "../AuthContext";

const PositionContext = createContext(null);

export const PositionProvider = ({children}) => {
  const [myPosition, setMyPosition] = useState({latitude: 0, longitude: 0});
  const [friendsPosition, setFriendsPosition] = useState([]);

  const {auth} = useContext(AuthContext);
  useEffect(() => {
    let timer = null;
    if (navigator.geolocation) {
      // Set a timer to update position every 5 seconds
      timer = setInterval(() => {
        navigator.geolocation.getCurrentPosition((position)=>{
          setMyPosition({latitude: position.coords.latitude, longitude: position.coords.longitude});
          if(auth !== null && auth !== undefined && auth.id !== null && auth.id !== undefined){
            axiosSpring.patch('/api/users/' + auth.id + '/position?latitude=' + position.coords.latitude + '&longitude=' + position.coords.longitude)
            .then((response) => {
            })
            .catch((error) => {
              console.log(error);
            });
          }
        });
      }, 3000);
    }
    // Set a time to get friends position every 15 seconds
    let friendsTimer = setInterval(() => {
      if(auth !== null && auth !== undefined && auth.id !== null && auth.id !== undefined){
        axiosSpring.get('/api/users/' + auth.id + '/shareBy')
        .then((response) => {
          if(response.status === 200) {
            if(response.data.length > 0){
              setFriendsPosition(response.data);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }, 15000);
    return () => {
      clearInterval(timer);
      clearInterval(friendsTimer);
    }
  }, [auth,setMyPosition]);

  return (
    <PositionContext.Provider value={{myPosition, setMyPosition, friendsPosition, setFriendsPosition}}>
      {children}
    </PositionContext.Provider>
  );
}

export default PositionContext;