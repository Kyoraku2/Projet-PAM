import React, {useEffect} from 'react';
import {useMap} from "react-leaflet";
import {FaRegDotCircle} from "react-icons/fa";


const SetViewOnClick = (props) => {
  const map = useMap();

  const handleClick = () => {
    map.setView(props.center, props.zoom);
  }

  return <button className={props.class+"__center"} onClick={handleClick}>
    <FaRegDotCircle />
  </button>;
};

export default SetViewOnClick;