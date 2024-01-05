import React, {useContext, useEffect, useState} from 'react';
import DefaultListIcone from '../../assets/images/defaultList.svg';
import '../places/place.scss';
import {FaHeart, FaEdit} from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { PiListPlusFill } from "react-icons/pi";
import {useNavigate, useParams} from "react-router-dom";
import axiosSpring from "../../utils/axios/axiosSpring";
import AlertContext from "../context/alerts/AlertContext";
import { ALERT_TYPES } from '../context/alerts/Alert';



const PlaceDetails = (props) => {

    /*
    * place
    * id
    * owner
    * name
    * img
    * description
    * coordinates
    * category
* */

    const DEFAULT_STR = '<No data>';
    const {placeID} = useParams();
    const navigate = useNavigate();

    const {setAlert} = useContext(AlertContext);

    const [name, setName] = useState(DEFAULT_STR);
    const [description, setDescription] = useState(DEFAULT_STR);
    const [image, setImage] = useState(DefaultListIcone);
    const [owner, setOwner] = useState(DEFAULT_STR);
    const [coordinates, setCoordinates] = useState([0,0]); //todo default
    const [category, setCategory] = useState(DEFAULT_STR);

    useEffect(() => {
        if(name===DEFAULT_STR){
            axiosSpring.get('api/places/'+placeID).then((response)=>{
                if(response.status === 200){
                    setName(response.data.name);
                    setDescription(response.data.description);
                    setOwner(response.data.ownerName);
                    setCategory(response.data.category);
                    setCoordinates([response.data.latitude,response.data.longitude]);

                    // TODO image du lieu

                }else{
                    setAlert({
                        type: ALERT_TYPES.ERROR.type,
                        message: 'Erreur lors de la récupération du lieu',
                        icon: ALERT_TYPES.ERROR.icon
                    });
                }

            }).catch((error)=>{
                console.log(error);
                setAlert({
                    type: ALERT_TYPES.ERROR.type,
                    message: 'Erreur lors de la récupération du lieu',
                    icon: ALERT_TYPES.ERROR.icon
                });
            });
        }

    }, [setAlert, name, placeID]);



    const handleFavorite=()=> {
        //todo
        console.log("handleFavorite");
    }

    const handleAddToList=()=> {
        //todo
        console.log("handleAddToList");
    }

    const handleEdit = () => {
        navigate('/places/update/'+placeID);
    }

    const handleDelete= () =>{
        if(window.confirm("Voulez-vous vraiment supprimer ce lieu ?")){
            axiosSpring.delete('api/places/'+placeID).then((response)=>{
                if (response.status === 200){
                    setAlert({
                        type: ALERT_TYPES.SUCCESS.type,
                        message: 'Lieu supprimé avec succès',
                        icon: ALERT_TYPES.SUCCESS.icon
                    });
                    navigate('/places');
                }else{
                    setAlert({
                        type: ALERT_TYPES.ERROR.type,
                        message: 'Erreur lors de la suppression du lieu',
                        icon: ALERT_TYPES.ERROR.icon
                    });
                }
            }).catch((error)=>{
                console.log(error);
                setAlert({
                    type: ALERT_TYPES.ERROR.type,
                    message: 'Erreur lors de la suppression du lieu',
                    icon: ALERT_TYPES.ERROR.icon
                });
            });
        }
    }


    return (
        <div className="placeDetails">

            <img src={image} alt="PlaceDetails image"/>

            <div className="placeDetails__content">

                <div className="placeDetails__actions">
                    <span className="placeDetails__actions__name">{name}</span>

                    <button className="placeDetails__actions__button" onClick={handleFavorite}><FaHeart />
                    </button>
                    <button className="placeDetails__actions__button" onClick={handleAddToList}><PiListPlusFill/>
                    </button>
                    {/*TODO : edit only accessible if we are ownner*/ }
                    <button className="placeDetails__actions__button" onClick={handleEdit}><FaEdit />
                    </button>
                    <button className="placeDetails__actions__button" onClick={handleDelete}><FaTrashAlt />
                    </button>
                </div>

                <p className="placeDetails__owner">Créé par {owner}</p>

                <p className="placeDetails__category">{category}</p>
                <p className="placeDetails__coordinates">{coordinates[0]} , {coordinates[1]}</p>

                <p className="placeDetails__description">{description}</p>

            </div>



        </div>
    );
};

export default PlaceDetails;