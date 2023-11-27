import React from 'react';
import {MapContainer, TileLayer} from "react-leaflet";

const MainMap = (props) => {
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
    </MapContainer>
  );
};

export default MainMap;