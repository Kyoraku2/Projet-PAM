import React, {useState} from 'react';
import DefaultListIcone from '../../assets/images/defaultList.svg';
import '../places/place.scss';
import {FaHeart, FaEdit} from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { PiListPlusFill } from "react-icons/pi";
import {useNavigate, useParams} from "react-router-dom";


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

    const [name, setName] = useState(DEFAULT_STR);
    const [description, setDescription] = useState(DEFAULT_STR);
    const [image, setImage] = useState(DefaultListIcone);
    const [owner, setOwner] = useState(DEFAULT_STR);
    const [coordinates, setCoordinates] = useState(["15°N","30°E"]); //todo default
    const [category, setCategory] = useState(DEFAULT_STR);



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
        //todo
        console.log("handleDelete");
    }


    return (
        <div className="placeDetails">

            <img src={image} alt="PlaceDetails image"/>

            <div className="content">

                <div className="actions">
                    <span className="name">{name}</span>

                    <button className="button" onClick={handleFavorite}><FaHeart />
                    </button>
                    <button className="button" onClick={handleAddToList}><PiListPlusFill/>
                    </button>
                    {/*TODO : edit only accessible if we are ownner*/ }
                    <button className="button" onClick={handleEdit}><FaEdit />
                    </button>
                    <button className="button" onClick={handleDelete}><FaTrashAlt />
                    </button>
                </div>

                <p className="owner">Créé par {owner}</p>

                <p className="category">{category}</p>
                <p className="coordinates">{coordinates[0]} , {coordinates[1]}</p>

                <p className="description">{description}</p>

            </div>



        </div>
    );
};

export default PlaceDetails;