import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import SetViewOnClick from "../MapControls/SetViewOnClick";

const MainMap = (props) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, [longitude,latitude,setLatitude,setLongitude]);


  return (
    <MapContainer
      className={props.class === undefined ? 'mainMap' : props.class+'__map'}
      center={[0, 0]}
      zoom={2}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {
        latitude !== null && longitude !== null ?
          <SetViewOnClick center={[latitude, longitude]} zoom={12} class={props.class === undefined ? 'mainMap__center' : props.class+'__map'}/> : null
      }

      {/*TODO : custom pointer for user*/}
      <Marker
        position={
          latitude !== null && longitude !== null ?
            [latitude, longitude]:[0, 0]
        }
      />
    </MapContainer>
  );
};

export default MainMap;