import React, {useContext, useEffect, useState} from 'react';
import './markerPopup.scss';
import DefaultPP from '../../assets/images/defaultPp.png';
import {IoClose} from 'react-icons/io5';
import axiosSpring from "../../utils/axios/axiosSpring";
import AuthContext from "../context/AuthContext";

const MarkerPopup = (props) => {
  const {auth} = useContext(AuthContext);
  const [image, setImage] = useState(DefaultPP);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  useEffect(() => {
    if (props.id === -1) {
      setName('C\'est vous !');
      setDescription('Une personne incroyable ;)');

      axiosSpring.get('/api/user/' + auth.id + '/profileImage', {
        responseType: 'arraybuffer'
      }).then(
        response => {
          if (response.status === 200) {
            const blob = new Blob([response.data], {type: 'image/png'});
            setImage(URL.createObjectURL(blob));
          }
          if (response.status === 204) {
            setImage(DefaultPP);
          }
        }
      ).catch(
        error => {
          console.log(error);
        }
      )
      return;
    }
    if (props.id !== null && props.id !== undefined) {
      if (props.type === 'friend') {
        axiosSpring.get('/api/users/' + props.id)
          .then((response) => {
            if (response.status === 200) {
              setName(response.data.username);
              setDescription('Une personne incroyable ;)');
              axiosSpring.get('/api/user/' + props.id + '/profileImage', {
                responseType: 'arraybuffer'
              }).then(
                response => {
                  if (response.status === 200) {
                    const blob = new Blob([response.data], {type: 'image/png'});
                    setImage(URL.createObjectURL(blob));
                  }
                  if (response.status === 204) {
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
      } else {
        axiosSpring.get('/api/places/' + props.id)
          .then((response) => {
            if (response.status === 200) {
              setName(response.data.name);
              setDescription(response.data.description);
              axiosSpring.get('/api/place/' + props.id + '/image', {
                responseType: 'arraybuffer'
              }).then(
                response => {
                  if (response.status === 200) {
                    const blob = new Blob([response.data], {type: 'image/png'});
                    setImage(URL.createObjectURL(blob));
                  }
                  if (response.status === 204) {
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
    }
  }, [props,auth]);

  return (
    <div className="markerPopup">
      <button className="markerPopup__close" onClick={props.closePopup}><IoClose/></button>
      <div className="markerPopup__content">
        <img src={image} alt=""/>
        <div className="markerPopup__content__text">
          <h3>{
            props.type === 'friend' ?
              "C'est " + name + " !"
              :name
          }</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default MarkerPopup;