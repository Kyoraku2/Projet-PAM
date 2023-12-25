import React, {useEffect} from 'react';
import {Rectangle, useMap, useMapEvents} from "react-leaflet";
import {FaRegDotCircle} from "react-icons/fa";



const SetViewOnClick = (props) => {
  const map = useMap();

  useEffect(() => {
    map.setView(props.center, props.zoom);
  }, []);

  const handleClick = () => {
    map.setView(props.center, props.zoom);
  }

  return <button className={props.class+"__center"} onClick={handleClick}>
    <FaRegDotCircle />
  </button>;
};

export default SetViewOnClick;