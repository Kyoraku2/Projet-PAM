import React, { useContext, useEffect, useState } from 'react';
import PlacePreview from "./PlacePreview";
import './place.scss';
import axiosSpring from '../../utils/axios/axiosSpring';
import AlertContext from '../context/alerts/AlertContext';
import { ALERT_TYPES } from '../context/alerts/Alert';

const PlaceCollection = (props) => {
    const {setAlert} = useContext(AlertContext);

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axiosSpring.get('/api/places/user/'+ 1 + (props.favorites ? '/favorites' : '')) // TODO: get user id from context
            .then((response) => {
                if(response.status === 200) {
                    setPlaces(response.data);
                }else{
                    setAlert({
                        type: ALERT_TYPES.ERROR.type,
                        message: 'Erreur lors de la récupération des lieux',
                        icon: ALERT_TYPES.ERROR.icon
                      });
                }
            })
            .catch((error) => {
                setAlert({
                    type: ALERT_TYPES.ERROR.type,
                    message: 'Erreur lors de la récupération des lieux',
                    icon: ALERT_TYPES.ERROR.icon
                  });
            });
    }, [setAlert, setPlaces, props]);

    return (
        <div className={props.class+'__placeCollection'}>
            {places.map((place) => {
                return (
                    <PlacePreview key={place.id} id={place.id} class = {props.class+'__placeCollection'}/>
                );
            })}
        </div>
    );
};

export default PlaceCollection;