import React, { useContext, useEffect, useState } from 'react';
import DefaultPP from "../../assets/images/defaultPp.png";
import { ALERT_TYPES } from '../context/alerts/Alert';
import axiosSpring from '../../utils/axios/axiosSpring';
import AlertContext from '../context/alerts/AlertContext';

const ProfileEdit = (props) => {
  const DEFAULT_STRING = '';
  const {setAlert} = useContext(AlertContext);
  const [name, setName] = useState(DEFAULT_STRING);
  const [email, setEmail] = useState(DEFAULT_STRING);
  const [description, setDescription] = useState(DEFAULT_STRING);
  const [image, setImage] = useState(DefaultPP);
  const [password, setPassword] = useState(DEFAULT_STRING);
  const [passConf, setPassConf] = useState(DEFAULT_STRING);

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
  
  const handleImageChange = (file) => {
    setImage(file);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // TODO : send data to backend
    // Check password & passConf
    // Check email
    // Check username
    // Check description
    // Hash password
    // Send data
    console.log(name, email, description, password, passConf);
  }

  return (
    <div className="profile__content">
      <div className="profile__content__item">
        <h2>Laissez les autres utilisateurs en connaître plus à propos de vous en choisissant une belle photo de profile.</h2>
        <article>
          <h3># Changer votre image de profile</h3>
          <div>
            <label htmlFor='profile_picture'>
              <img src={image} alt='profile'/>
                  <div>
                      <h4>Choisir une image...</h4>
                      <p>Une image carrée serait parfait ;)</p>
                      <p>Taille maximum : 5mb</p>
                  </div>
            </label>
            <input type="file" id='profile_picture' name='profile_picture' onChange={(e) => {
              handleImageChange(e.target.files[0]);
            }}/>
          </div>
        </article>
      </div>
      <div className="profile__content__item">
        <h2>À propos de vous</h2>
        <form onSubmit={handleFormSubmit}>
            <h3># Changer vos informations personnelles</h3>
            <label htmlFor='username'>Username</label>
            <input type="text" id='username' name='username' value={name} onChange={setName}></input>
            <label htmlFor='email'>Email</label>
            <input type="text" id='email' name='email' value={email} onChange={setEmail}></input>
            <label htmlFor='description'>Bio</label>
            <textarea id='description' name='description' value={description} onChange={setDescription}></textarea>
            <label htmlFor='current_password'>Mot de passe courant</label>
            <input type="password" id='current_password' name='current_password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <label htmlFor='new_password'>Nouveau mot de passe<span>Tips : laissez vide si aucun changement</span></label>
            <input type="password" id='new_password' name='new_password' value={passConf} onChange={(e) => setPassConf(e.target.value)}></input>
            <button type='submit'>Enregistrer</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;