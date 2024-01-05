import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import DefaultList from "../../assets/images/defaultList.svg";
import axiosSpring from '../../utils/axios/axiosSpring';
import AlertContext from '../context/alerts/AlertContext';
import { ALERT_TYPES } from '../context/alerts/Alert';
import './details.scss';
import { MdAddCircleOutline, MdDelete, MdEdit } from 'react-icons/md';
import { FaShareAlt } from "react-icons/fa";
import AddPlaceModal from './AddPlaceModal';

const ListDetails = (props) => {
    const DEFAULT_STR = '<No data>';
    const {listID} = useParams();
    const {setAlert} = useContext(AlertContext);
    const navigate = useNavigate();


    const [name, setName] = useState(DEFAULT_STR);
    const [ownerName, setOwnerName] = useState(DEFAULT_STR);
    const [description, setDescription] = useState(DEFAULT_STR);
    const [places, setPlaces] = useState([]);
    const [image, setImage] = useState(DefaultList);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if(name === DEFAULT_STR){
            axiosSpring.get('/api/lists/' + listID)
            .then((response) => {
                if(response.status === 200) {
                    setName(response.data.name);
                    setDescription(response.data.description);
                    setOwnerName(response.data.ownerName);
                    setPlaces(response.data.places);
                    axiosSpring.get("/api/list/"+listID+"/image",{
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
                        message: 'Erreur lors de la récupération de la liste',
                        icon: ALERT_TYPES.ERROR.icon
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                setAlert({
                    type: ALERT_TYPES.ERROR.type,
                    message: 'Erreur lors de la récupération de la liste',
                    icon: ALERT_TYPES.ERROR.icon
                });
            })
        }
    }, [setAlert, listID, name])

    const handleEdit = () => {
        navigate('/lists/update/'+listID);
    }

    const handeDelete = () => {
        if(window.confirm("Voulez-vous vraiment supprimer cette liste ?")){
            axiosSpring.delete('/api/lists/'+listID)
            .then((response) => {
                if(response.status === 200) {
                    setAlert({
                        type: ALERT_TYPES.SUCCESS.type,
                        message: 'Liste supprimée avec succès',
                        icon: ALERT_TYPES.SUCCESS.icon
                    });
                    navigate('/lists');
                }else{
                    setAlert({
                        type: ALERT_TYPES.ERROR.type,
                        message: 'Erreur lors de la suppression de la liste',
                        icon: ALERT_TYPES.ERROR.icon
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                setAlert({
                    type: ALERT_TYPES.ERROR.type,
                    message: 'Erreur lors de la suppression de la liste',
                    icon: ALERT_TYPES.ERROR.icon
                });
            })
        }
    }

    const handleShare = () => {
        // Prompt to ask the username to share the list with
        const username = window.prompt("Avec qui voulez-vous partager cette liste ?");
        
        if(username !== null || username !== undefined || username !== ''){
            axiosSpring.patch(`/api/lists/${listID}/share/${username}`)
            .then((response) => {
                setAlert({
                    type: ALERT_TYPES.SUCCESS.type,
                    message: 'Si l\'utilisateur "'+username+'" existe, la liste lui a été partagée avec succès',
                    icon: ALERT_TYPES.SUCCESS.icon
                });
            })
            .catch((error) => {
                setAlert({
                    type: ALERT_TYPES.SUCCESS.type,
                    message: 'Si l\'utilisateur existe, la liste lui a été partagée avec succès',
                    icon: ALERT_TYPES.SUCCESS.icon
                });
            })
        }
    }

    const handleAddPlace = () => {
        setShowModal(!showModal);
    }

    const updatePlaces = (newPlaces) => {
        setPlaces(newPlaces);
    }
    

    return (
        <>
            <section className="listDetails">
                <div className="listDetails__actions">
                    <button className="listDetails__actions__share" title='Partager' onClick={handleShare}><FaShareAlt /></button>
                    <button className="listDetails__actions__edit" title='Modifier' onClick={handleEdit}><MdEdit /></button>
                    <button className="listDetails__actions__delete" title='Supprimer' onClick={handeDelete}><MdDelete /></button>
                </div>
                <div className="listDetails__content">
                    <img src={image} alt="List"/>
                    <div className="listDetails__content__infos">
                        <h1>{name}</h1>
                        <span>Créée par {ownerName}</span>
                        <p><span>Description : </span>{description}</p>
                        <div>
                            <h2>Lieux</h2>
                            <button className="listDetails__content__infos__addPlace" onClick={handleAddPlace}><MdAddCircleOutline /></button>
                        </div>
                        <ul className="listDetails__content__infos__places">
                            {places.map((place) => (
                                <li key={place.id}>
                                    <a href={"/places/"+place.id}>{place.id + ". "+ place.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
            {
                showModal ?
                <AddPlaceModal listID={listID} name={name} presentPlaces={places} closeModal={handleAddPlace} updatePlaces={updatePlaces}/>
                :
                null
            }
        </>
    )
}

export default ListDetails