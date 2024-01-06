import React, {useEffect, useState} from 'react';
import './markerPopup.scss';
import DefaultPP from '../../assets/images/defaultPp.png';
import { IoClose } from 'react-icons/io5';
import axiosSpring from "../../utils/axios/axiosSpring";

const MarkerPopup = (props) => {
  const [image, setImage] = useState(DefaultPP);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);


  useEffect(() => {
    if(props.id === -1){
      setName('C\'est vous !');
      setDescription('Une personne incroyable ;)');
      setImage(DefaultPP); // TODO : get profile picture
      return ;
    }
    if(props.id !== null && props.id !== undefined){
      axiosSpring.get('/api/places/'+props.id)
        .then((response) => {
          if(response.status === 200) {
            setName(response.data.name);
            setDescription(response.data.description);
            axiosSpring.get('/api/place/'+props.id+'/image', {
              responseType: 'arraybuffer'
            }).then(
              response => {
                if(response.status === 200) {
                  const blob = new Blob([response.data], {type: 'image/png'});
                  setImage(URL.createObjectURL(blob));
                }
                if(response.status === 204) {
                  setImage(DefaultPP);
                }
              }
            ).catch(
              error => {
                console.log(error);
              }
            )
          }
        })
    }
  }, [props]);

  return (
    <div className="markerPopup">
      <button className="markerPopup__close" onClick={props.closePopup}><IoClose/></button>
      <div className="markerPopup__content">
        <img src={image} alt=""/>
        <div className="markerPopup__content__text">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default MarkerPopup;