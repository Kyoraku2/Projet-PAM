import {createContext, useEffect, useState} from "react";
import axiosSpring from "../../../utils/axios/axiosSpring";

const PositionContext = createContext(null);

export const PositionProvider = ({children}) => {
  const [myPosition, setMyPosition] = useState({latitude: 0, longitude: 0});
  const [friendsPosition, setFriendsPosition] = useState([]);

  useEffect(() => {
    let timer = null;
    if (navigator.geolocation) {
      // Set a timer to update position every 5 seconds
      timer = setInterval(() => {
        navigator.geolocation.getCurrentPosition((position)=>{
          setMyPosition({latitude: position.coords.latitude, longitude: position.coords.longitude});
          axiosSpring.patch('/api/users/' + 1 + '/position?latitude=' + position.coords.latitude + '&longitude=' + position.coords.longitude) // TODO : get user id
            .then((response) => {
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }, 3000);
    }
    // Set a time to get friends position every 15 seconds
    let friendsTimer = setInterval(() => {
      axiosSpring.get('/api/users/' + 1 + '/shareBy') // TODO : get user id
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
    }, 15000);
    return () => {
      clearInterval(timer);
      clearInterval(friendsTimer);
    }
  }, [setMyPosition]);

  return (
    <PositionContext.Provider value={{myPosition, setMyPosition, friendsPosition, setFriendsPosition}}>
      {children}
    </PositionContext.Provider>
  );
}

export default PositionContext;