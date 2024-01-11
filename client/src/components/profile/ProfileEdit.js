import React, {useContext, useEffect, useState} from 'react';
import DefaultPP from "../../assets/images/defaultPp.png";
import {ALERT_TYPES} from '../context/alerts/Alert';
import axiosSpring from '../../utils/axios/axiosSpring';
import AlertContext from '../context/alerts/AlertContext';
import {INVALID_CHARS, isEmailValid} from '../../utils/consts';
import {SHA256} from "crypto-js";

const ProfileEdit = (props) => {
  const DEFAULT_STRING = '';
  const {setAlert} = useContext(AlertContext);
  const [name, setName] = useState(DEFAULT_STRING);
  const [email, setEmail] = useState(DEFAULT_STRING);
  const [description, setDescription] = useState(DEFAULT_STRING);
  const [image, setImage] = useState(DefaultPP);
  const [imagePreview, setImagePreview] = useState(DefaultPP);
  const [newPassword, setNewPassword] = useState(DEFAULT_STRING);
  const [newPassConf, setNewPassConf] = useState(DEFAULT_STRING);
  const [passToCompare, setPassToCompare] = useState(DEFAULT_STRING);
  const [currentPassword, setCurrentPassword] = useState(DEFAULT_STRING);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [newPasswordConfError, setNewPasswordConfError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if(name === DEFAULT_STRING) {
      axiosSpring.get('/api/users/' + 1) // TODO : change 1 to user id
      .then(response => {
        if(response.status === 200) {
          setName(response.data.username);
          setEmail(response.data.email);
          setDescription(response.data.description);
          setPassToCompare(response.data.password);

          axiosSpring.get('/api/user/' + 1 + '/profileImage', {
            responseType: 'arraybuffer'
          }).then(
            response => {
              if(response.status === 200) {
                const blob = new Blob([response.data], {type: 'image/png'});
                handleImageChange(blob);
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
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setNameError(false);
    setEmailError(false);
    setNewPasswordError(false);
    setNewPasswordConfError(false); 
    setCurrentPasswordError(false);
    
    // Check username
    if(name === DEFAULT_STRING) {
      setNameError('Veuillez renseigner un surnom.');
      return;
    }

    if(name === null || name === undefined || name === '') {
      setNameError('Veuillez renseigner un surnom.');
      return;
    }

    // Check if no invalid caracters
    for (let i = 0; i < INVALID_CHARS.length; i++) {
      if (name.includes(INVALID_CHARS[i])) {
        setNameError(
          'Le surnom ne doit pas contenir de caractères spéciaux (sauf - et _).'
        );
        return;
      }
    }

    // Check email
    if(email === DEFAULT_STRING) {
      setEmailError('Veuillez renseigner un email.');
      return;
    }

    if(email === null || email === undefined || email === '') {
      setEmailError('Veuillez renseigner un email.');
      return;
    }

    // Check if its a valid email
    if(!isEmailValid(email)) {
      setEmailError('Veuillez renseigner un email valide.');
      return;
    }

    // Check password
    if(newPassword === DEFAULT_STRING) {
      setNewPasswordError('Veuillez renseigner votre mot de passe.');  
      return;
    }

    if(newPassword === null || newPassword === undefined || newPassword === '') {
      setNewPasswordError('Veuillez renseigner votre mot de passe.');
      return; 
    }

    if(newPassword.length < 8) {
      setNewPasswordError('Votre mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    // Needs to contains 1 number, 1 uppercase, 1 lowercase and 1 special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/gm;
    if(!regex.test(newPassword)) {
      setNewPasswordError('Votre mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.');
      return;
    }

    // Check password confirmation
    if(newPassConf !== newPassword) {
      setNewPasswordError('Les mots de passe ne correspondent pas.');
      setNewPasswordConfError('Les mots de passe ne correspondent pas.');
      return;
    }

    // Check current password
    if(passToCompare !== SHA256(currentPassword).toString()) {
      setCurrentPasswordError('Mot de passe incorrect.');
      return;
    }

    // Hash password
    const hashedPassword = SHA256(newPassword).toString();

    let formData = new FormData();

    formData.append('image', image);

    formData.append('user', JSON.stringify({
      id: 1, // TODO : change 1 to user id
      username: name,
      email: email,
      description: description,
      password: hashedPassword
    }));

    axiosSpring.put('/api/users/' + 1, formData) // TODO : change 1 to user id
      .then(response => {
        if(response.status === 200) {
          setAlert({
            type: ALERT_TYPES.SUCCESS.type,
            message: 'Profile modifié avec succès.',
            icon: ALERT_TYPES.SUCCESS.icon
          });
        }else{
          setAlert({
            type: ALERT_TYPES.ERROR.type,
            message: 'Erreur lors de la modification du profile.',
            icon: ALERT_TYPES.ERROR.icon  
          });
        }
      })
      .catch(error => {
        console.log(error);
        setAlert({
          type: ALERT_TYPES.ERROR.type,
          message: 'Erreur lors de la modification du profile.',
          icon: ALERT_TYPES.ERROR.icon
        });
      });
  }

  return (
    <div className="profile__content">
      <div className="profile__content__item">
        <h2>Laissez les autres utilisateurs en connaître plus à propos de vous en choisissant une belle photo de profile.</h2>
        <article>
          <h3># Changer votre image de profile</h3>
          <div>
            <label htmlFor='profile_picture'>
              <img src={imagePreview} alt='profile'/>
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
            <input type="text" id='username' name='username' value={name} onChange={(e) => setName(e.target.value)}></input>
            {
              nameError ? <p className="profile__content__item__error">{nameError}</p> : null
            }
            <label htmlFor='email'>Email</label>
            <input type="text" id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            {
              emailError ? <p className="profile__content__item__error">{emailError}</p> : null
            }
            <label htmlFor='description'>Bio</label>
            <textarea id='description' name='description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <label htmlFor='current_password'>Mot de passe courant</label>
            <input type="password" id='current_password' name='current_password' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}></input>
            {
              currentPasswordError ? <p className="profile__content__item__error">{currentPasswordError}</p> : null
            }
            <label htmlFor='password'>Nouveau mot de passe<span>Tips : laissez vide si aucun changement</span></label>
            <input type="password" id='password' name='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
            {
              newPasswordError ? <p className="profile__content__item__error">{newPasswordError}</p> : null
            }
            <label htmlFor='new_password'>Confimation du nouveau mot de passe<span>Tips : laissez vide si aucun changement</span></label>
            <input type="password" id='new_password' name='new_password' value={newPassConf} onChange={(e) => setNewPassConf(e.target.value)}></input>
            {
              newPasswordConfError ? <p className="profile__content__item__error">{newPasswordConfError}</p> : null
            }
            <button type='submit'>Enregistrer</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;