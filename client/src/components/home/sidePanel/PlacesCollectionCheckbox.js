import {useEffect, useState} from "react";
import axiosSpring from "../../../utils/axios/axiosSpring";
import PlacePreviewCheckbox from "./PlacePreviewCheckbox";

const PlacesCollectionCheckbox = (props) =>{
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axiosSpring.get('/api/places/user/'+ 1) // TODO: get user id from context
            .then((response) => {
                if(response.status === 200) {
                    setPlaces(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setPlaces, props]);

    return (
        <ul className="collectionsCheck">
            {places.map((place) => {
                return (
                    <PlacePreviewCheckbox key={place.id} id={place.id} name={place.name} image={place.image} onChange={props.onChange} checkedPlaces={props.checkedPlaces}/>
                );
            })}
        </ul>
    );
}

export default PlacesCollectionCheckbox;