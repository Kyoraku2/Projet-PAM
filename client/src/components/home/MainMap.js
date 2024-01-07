import React, {useContext, useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import SetViewOnClick from "../MapControls/SetViewOnClick";
import MarkerPopup from "./MarkerPopup";
import {Icon} from "leaflet/src/layer";
import PositionContext from "../context/position/PositionContext";

const MainMap = (props) => {
  const [defaultPosition, setDefaultPosition] = useState([0, 0]);
  const {myPosition, friendsPosition} = useContext(PositionContext);
  const [popupID, setPopupID] = useState(null);

  useEffect(() => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        setDefaultPosition([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, [setDefaultPosition]);

  const computeDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const phi1 = lat1 * Math.PI/180; // φ, λ in radians
    const phi2 = lat2 * Math.PI/180;
    const deltaPhi = (lat2-lat1) * Math.PI/180;
    const deltaLambda = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
      Math.cos(phi1) * Math.cos(phi2) *
      Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    // in metres
    return R * c;
  }

  const handleMarkerClick = (e, id) => {
    if(popupID !== null && popupID === id){
      setPopupID(null);
    }else{
      setPopupID(id);
    }
  }

  const userIcon = new Icon ({
    iconUrl : require(`../../assets/images/markers/user.png`),
    iconSize : [35, 35]
  });

  const friendIcon = new Icon ({
    iconUrl : require(`../../assets/images/markers/friend.png`),
    iconSize : [35, 35]
  });

  const handlePopupClose = () => {
    setPopupID(null);
  }

  return (
    <>
      <MapContainer
        className={props.class === undefined ? 'mainMap' : props.class+'__map'}
        center={[0, 0]}
        zoom={2}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <SetViewOnClick center={[myPosition.latitude, myPosition.longitude]} zoom={12} class={props.class === undefined ? 'mainMap__center' : props.class+'__map'}/> : null

        <Marker
          icon={userIcon}
          position={
            myPosition.latitude !== null && myPosition.longitude !== null ?
              [myPosition.latitude, myPosition.longitude] : defaultPosition
          }
          eventHandlers={{
            click: (e) => {
              handleMarkerClick(e, -1);
            },

          }}
        />

        {
          friendsPosition.length > 0 ?
            friendsPosition.map((friend, index) => {
              return (
                <Marker
                  key={'marker-'+index+'friend.id'}
                  icon={friendIcon}
                  position={[friend.latitude, friend.longitude]}
                >
                  <Popup>
                    <span>C'est {friend.username} !</span>
                  </Popup>
                </Marker>
              );
            })
            : null
        }

        {
          props.places !== undefined ?
            props.places.map((place, index) => {
              const distance = computeDistance(myPosition.latitude, myPosition.longitude, place.latitude, place.longitude);
              if(props.activeFilter === undefined || props.activeFilter === null){
                return (
                  <Marker
                    key={'marker-'+index+'place.id'}
                    position={[place.latitude, place.longitude]}
                    eventHandlers={{
                      click: (e) => {
                        handleMarkerClick(e, place.id);
                      },
                    }}
                  />
                );
              }else{
                if(place.category === props.activeFilter || (props.activeFilter === 'radius' && distance/1000 < props.radius)){
                  return (
                    <Marker
                      key={'marker-'+index+'place.id'}
                      position={[place.latitude, place.longitude]}
                      eventHandlers={{
                        click: (e) => {
                          handleMarkerClick(e, place.id);
                        },
                      }}
                    />
                  );
                }
              }
            })
            : null
        }
      </MapContainer>
      {
        popupID !== null ?
          <MarkerPopup id={popupID} closePopup={handlePopupClose}/> : null
      }
    </>
  );
};

export default MainMap;