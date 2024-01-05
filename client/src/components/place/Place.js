import React, {useState} from 'react';
import DefaultListIcone from '../../assets/images/defaultList.svg';
import './place.scss';
import {FaHeart, FaEdit} from "react-icons/fa";
import { TbPlaylistAdd } from "react-icons/tb";



const Place = (props) => {


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

    const [name, setName] = useState("Name");
    const [description, setDescription] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    const [image, setImage] = useState(DefaultListIcone);
    const [owner, setOwner] = useState("Pseudo");
    const [coordinates, setCoordinates] = useState(["15°N","30°E"]);
    const [category, setCategory] = useState("Category");


    return (
        <div className="placePage">

            <img src={image} alt="Place image"/>

            <div className="content">

                <div className="actions">
                    <span className="name">{name}</span>
                    {/*TODO : edit only accessible if we are ownner*/ }
                    <button className="button"><FaEdit />
                    </button>
                    <button className="button"><FaHeart />
                    </button>
                    <button className="button"><TbPlaylistAdd />
                    </button>
                </div>


                <p className="category">{category}</p>
                <p className="coordinates">{coordinates[0]} , {coordinates[1]}</p>

                <p className="description">{description}</p>

            </div>



        </div>
    );
};

export default Place;