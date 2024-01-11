import React, {useContext, useEffect, useState} from 'react'
import axiosSpring from '../../utils/axios/axiosSpring';
import AlertContext from '../context/alerts/AlertContext';
import {ALERT_TYPES} from '../context/alerts/Alert';
import './modal.scss';
import {IoClose} from 'react-icons/io5';
import AuthContext from "../context/AuthContext";

const AddPlaceModal = (props) => {
    const {setAlert} = useContext(AlertContext);
    const {auth} = useContext(AuthContext);
    const [places, setPlaces] = useState([]);
    const [selectedPlaces, setSelectedPlaces] = useState(props.presentPlaces);

    useEffect(() => {
        axiosSpring.get('/api/places/user/'+auth.id)
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
            console.log(error);
            setAlert({
                type: ALERT_TYPES.ERROR.type,
                message: 'Erreur lors de la récupération des lieux',
                icon: ALERT_TYPES.ERROR.icon
            });
        })
    }, [setAlert, setPlaces, auth]);

    const handleCheck = (e) => {
        console.log('/api/lists/'+props.listID+'/removePlace/'+e.target.value);
        if(e.target.checked){
            axiosSpring.patch('/api/lists/'+props.listID+'/addPlace/'+e.target.value)
            .then((response) => {
                if(response.status === 200) {
                    setSelectedPlaces([...selectedPlaces, places.find((place) => place.id === parseInt(e.target.value))]);
                    props.updatePlaces([...selectedPlaces, places.find((place) => place.id === parseInt(e.target.value))]);
                    setAlert({
                        type: ALERT_TYPES.SUCCESS.type,
                        message: 'Lieu ajouté à la liste',
                        icon: ALERT_TYPES.SUCCESS.icon
                    });
                }else{
                    setAlert({
                        type: ALERT_TYPES.ERROR.type,
                        message: 'Erreur lors de l\'ajout du lieu à la liste',
                        icon: ALERT_TYPES.ERROR.icon
                    });
                }
            });
        }else{
            axiosSpring.patch('/api/lists/'+props.listID+'/removePlace/'+e.target.value)
            .then((response) => {
                if(response.status === 200) {
                    setSelectedPlaces(selectedPlaces.filter((place) => place.id !== parseInt(e.target.value)));
                    props.updatePlaces(selectedPlaces.filter((place) => place.id !== parseInt(e.target.value)));
                    setAlert({
                        type: ALERT_TYPES.SUCCESS.type,
                        message: 'Lieu retiré de la liste',
                        icon: ALERT_TYPES.SUCCESS.icon
                    });
                }else{
                    setAlert({
                        type: ALERT_TYPES.ERROR.type,
                        message: 'Erreur lors du retrait du lieu de la liste',
                        icon: ALERT_TYPES.ERROR.icon
                    });
                }
            });
        }
    }

    return (
        <>
        <div className="clickToClose" onClick={props.closeModal}></div>
        <div className='modal'>
            <button className='modal__close' onClick={props.closeModal}><IoClose /></button>
            <h1>Ajouter un lieu à la liste "{props.name}"</h1>
            <h2>Lieux disponibles</h2>
            <ul className='modal__places'>
                {places.map((place) => (
                    <li key={place.id} className='modal__places__item'>
                        <input type="checkbox" id={place.id} name={place.name} value={place.id} checked={
                            selectedPlaces.map((place) => place.id).includes(place.id)
                        } onChange={handleCheck}/>
                        <label htmlFor={place.id}>{place.name}</label>
                    </li>
                ))}
            </ul>
            
        </div>
        </>
    )
}

export default AddPlaceModal