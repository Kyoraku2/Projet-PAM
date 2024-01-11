import React, {useContext, useEffect, useState} from 'react';
import PlacePreview from "./PlacePreview";
import './place.scss';
import axiosSpring from '../../utils/axios/axiosSpring';
import AlertContext from '../context/alerts/AlertContext';
import {ALERT_TYPES} from '../context/alerts/Alert';
import {CgMenuGridR} from "react-icons/cg";
import {SlList} from "react-icons/sl";
import AuthContext from "../context/AuthContext";

const PlaceCollection = (props) => {
    const {setAlert} = useContext(AlertContext);
    const {auth} = useContext(AuthContext);

    const [places, setPlaces] = useState([]);
    const [view, setView] = useState('card');

    useEffect(() => {
        axiosSpring.get('/api/places/user/'+ auth.id + (props.favorites ? '/favorites' : ''))
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
    }, [setAlert, setPlaces, props, auth]);

    const handleChangeView = (e) => {
        setView(e.target.value);
    }

    return (
        <div className={props.class+'__placeCollection '+view}>
            {places.map((place) => {
                return (
                    <PlacePreview key={place.id} id={place.id} class = {props.class+'__placeCollection'}/>
                );
            })}

            <div className="view">

                <input type="checkbox" name="view" value="card" checked={view==="card"} id="radioCard" onChange={handleChangeView}/>
                <label className="labelForChecked" htmlFor="radioCard"><CgMenuGridR />
                </label>

                <input type="checkbox" name="view" value="list" id="radioList" checked={view==="list"} onChange={handleChangeView}/>
                <label className="labelForChecked" htmlFor="radioList"><SlList />

                </label>
            </div>

        </div>
    );
};

export default PlaceCollection;