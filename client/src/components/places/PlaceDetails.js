import React, {useContext, useEffect, useState} from 'react';
import DefaultListIcone from '../../assets/images/defaultList.svg';
import '../places/place.scss';

import {FaEdit, FaHeart, FaTrashAlt} from "react-icons/fa";
import {useNavigate, useParams} from "react-router-dom";

import axiosSpring from "../../utils/axios/axiosSpring";
import AlertContext from "../context/alerts/AlertContext";
import {ALERT_TYPES} from '../context/alerts/Alert';
import AuthContext from "../context/AuthContext";


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
    const {auth} = useContext(AuthContext);

    const [name, setName] = useState(DEFAULT_STR);
    const [description, setDescription] = useState(DEFAULT_STR);
    const [image, setImage] = useState(DefaultListIcone);
    const [owner, setOwner] = useState(DEFAULT_STR);
    const [coordinates, setCoordinates] = useState([0,0]); //todo default
    const [category, setCategory] = useState(DEFAULT_STR);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if(name===DEFAULT_STR){
            axiosSpring.get('api/places/'+placeID).then((response)=>{
                if(response.status === 200){
                    if(response.ownerID !== auth.id){
                        navigate('/places');
                    }
                    setName(response.data.name);
                    setDescription(response.data.description);
                    setOwner(response.data.ownerName);
                    setCategory(response.data.category);
                    setCoordinates([response.data.latitude,response.data.longitude]);
                    setIsFavorite(response.data.isFavorite);

                    axiosSpring.get("/api/place/"+placeID+"/image",{
                        responseType: 'arraybuffer',
                    }).then(
                        response => {
                            if(response.status === 200){
                                // Create a blob from the image
                                const blob = new Blob([response.data], {type: 'image/png'});
                                // Create a data URL from the blob
                                const dataUrl = URL.createObjectURL(blob);
                                // Set the data URL to display the image
                                setImage(dataUrl);
                            }
                        }
                    ).catch(
                        error => {
                            console.log(error);
                        }
                    )

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

    }, [setAlert, name, placeID, auth]);



    const handleFavorite=()=> {



        let action = "addToFavorite";
        let msg = "Lieu ajouté aux favoris";
        let errorMsg = "Erreur lors de l'ajout du lieu aux favoris";

        if(isFavorite){
            action = "removeFromFavorite";
            msg = "Lieu retiré des favoris";
            errorMsg = "Erreur lors du retrait du lieu des favoris";
        }

        axiosSpring.patch('api/places/user/'+ auth.id+'/'+action+'/'+placeID).then((response)=>{
            if(response.status === 200){
                setAlert({
                    type: ALERT_TYPES.SUCCESS.type,
                    message: msg,
                    icon: ALERT_TYPES.SUCCESS.icon
                });
            }else{
                setAlert({
                    type: ALERT_TYPES.ERROR.type,
                    message: errorMsg,
                    icon: ALERT_TYPES.ERROR.icon
                });
            }
        }).catch((error)=>{
            console.log(error);
            setAlert({
                type: ALERT_TYPES.ERROR.type,
                message: errorMsg,
                icon: ALERT_TYPES.ERROR.icon
            });
        });

        setIsFavorite(!isFavorite);


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

            <img src={image} alt="lieu"/>

            <div className="placeDetails__content">

                <div className="placeDetails__actions">
                    <span className="placeDetails__actions__name">{name}</span>
                    <button className={isFavorite? "placeDetails__actions__button fav" : "placeDetails__actions__button"} onClick={handleFavorite}><FaHeart />
                    </button>
                    {/*<button className="placeDetails__actions__button" onClick={handleAddToList}><PiListPlusFill/>
                    </button>*/}
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