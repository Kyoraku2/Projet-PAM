import React, { useContext, useState } from 'react';
import './inscription.css';
import { ALERT_TYPES } from '../context/alerts/Alert';
import axiosSpring from '../../utils/axios/axiosSpring';
import AlertContext from '../context/alerts/AlertContext';


const UserAdd = () => {
const [isChecked, setIsChecked] = useState(false);
const { setAlert } = useContext(AlertContext);
const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    description: '',
    latitude: 0,
    longitude: 0
});


const onChange = (e) => {
    const { name, value } = e.target;
    setUser({
        ...user,
        [name]: value
    });
}

const onSubmit = (e) => {
e.preventDefault();

console.log("Données soumises :", user);
axiosSpring.put('/api/auth/register', new URLSearchParams(user))
.then(response => {
    if (response.status === 200) {
        setAlert({
        type: ALERT_TYPES.SUCCESS.type,
        message: 'Utilisateur inscrit avec succès.',
        icon: ALERT_TYPES.SUCCESS.icon
      });
      } else {
      setAlert({
      type: ALERT_TYPES.ERROR.type,
      message: 'Erreur lors de la inscription.',
      icon: ALERT_TYPES.ERROR.icon
      });
    }
 })
.catch(error => {
   console.log(error);
   setAlert({
   type: ALERT_TYPES.ERROR.type,
   message: 'Erreur lors de la inscription.',
   icon: ALERT_TYPES.ERROR.icon
   });
  });
}

return (
<div>
    <div className='forme'>
        <form onSubmit={onSubmit}>
            <div>
                <h1 className='text-3xl text-indigo-950 center form-group' >
                    Créer un compte
                </h1>
            </div>
            <div className="form-group">
                <label htmlFor="username">Nom d'utilisateur:</label>
                <input
                    type='text'
                    className="form-control common-input"
                    name="username"
                    placeholder="Entrez votre nom d'utilisateur"
                    value={user.username}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">E-mail:</label>
                <input
                    type='email'
                    className="form-control common-input"
                    name="email"
                    placeholder="Entrez votre adresse e-mail"
                    value={user.email}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Mot de passe:</label>
                <input
                    type='password'
                    className="form-control common-input"
                    name="password"
                    placeholder="Entrez votre mot de passe"
                    value={user.password}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    type='text'
                    className="form-control common-input"
                    name="description"
                    placeholder="Entrez une description"
                    value={user.description}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="latitude">Latitude:</label>
                <input
                    type='number'
                    className="form-control common-input-number"
                    name="latitude"
                    placeholder="Entrez la latitude"
                    value={user.latitude}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="longitude">Longitude:</label>
                <input
                    type='number'
                    className="form-control common-input-number"
                    name="longitude"
                    placeholder="Entrez la longitude"
                    value={user.longitude}
                    onChange={onChange}
                />
            </div>
            <div className="form-group form-check inline">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                    J'accepte les conditions générales d'utilisation
                </label>
            </div>
            <div className="center-container form-group">
                <button type='submit'>
                    S'inscrire
                </button>
            </div>
        </form>
    </div>
</div>
);

}
export default UserAdd;
