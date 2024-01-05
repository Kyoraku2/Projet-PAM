import React, { useContext, useEffect, useState } from 'react';
import DefaultPP from "../../assets/images/defaultPp.png";
import axiosSpring from '../../utils/axios/axiosSpring';
import AlertContext from '../context/alerts/AlertContext';
import { ALERT_TYPES } from '../context/alerts/Alert';

const ProfileMainContent = (props) => {
  const DEFAULT_STRING = '';
  const {setAlert} = useContext(AlertContext);
  const [name, setName] = useState(DEFAULT_STRING);
  const [email, setEmail] = useState(DEFAULT_STRING);
  const [description, setDescription] = useState(DEFAULT_STRING);
  const [image, setImage] = useState(DefaultPP);

  useEffect(() => {
    if(name === DEFAULT_STRING) {
      axiosSpring.get('/api/users/' + 1) // TODO : change 1 to user id
      .then(response => {
        if(response.status === 200) {
          setName(response.data.username);
          setEmail(response.data.email);
          setDescription(response.data.description);

          axiosSpring.get('/api/user/' + 1 + '/profileImage', {
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
        }else{
          setAlert({
            type: ALERT_TYPES.ERROR.type,
            message: 'Erreur lors de la récupération des données de votre profile.',
            icon: ALERT_TYPES.ERROR.icon
        });
        }
      })
      .catch(error => {
        console.log(error);
        setAlert({
          type: ALERT_TYPES.ERROR.type,
          message: 'Erreur lors de la récupération des données de votre profile.',
          icon: ALERT_TYPES.ERROR.icon
      });
      });
    }
  }, [name, setAlert, setName, setEmail, setDescription]);

  // TODO : connect to backend
  return (
    <div className="profile__content">
      <div className="profile__content__item">
        <h2>Laissez les autres utilisateurs en connaître plus à propos de vous en choisissant une belle photo de profile.</h2>
        <article>
          <h3># Image de profile</h3>
          <div>
            <img src={image} alt='profile'/>
            <div>
              <p>Parfait !</p>
              <p>Cette images vous représente à travers tout le site :)</p>
            </div>
          </div>
        </article>
      </div>
      <div className="profile__content__item">
        <h2>À propos de vous</h2>
        <form>
          <h3># Informations personnelles</h3>
          <label htmlFor='username'>Username</label>
          <input type="text" id='username' name='username' value={name} readOnly></input>
          <label htmlFor='email'>Email</label>
          <input type="text" id='email' name='email' value={email} readOnly></input>
          <label htmlFor='description'>Bio</label>
          <textarea id='description' name='description' value={description} readOnly></textarea>
        </form>
      </div>
    </div>
  );
};

export default ProfileMainContent;