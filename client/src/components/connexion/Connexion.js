import './connexion.css';
import myImage from './username-icon.jpg';
import  {  useContext, useState } from 'react';
import axiosSpring from '../../utils/axios/axiosSpring';
import { useNavigate } from 'react-router-dom';
import { ALERT_TYPES } from '../context/alerts/Alert';
import AlertContext from '../context/alerts/AlertContext';

const Login =() => {
let navigate = useNavigate()

const { setAlert } = useContext(AlertContext);
const [credentials, setCredentials] = useState({

    username: '',
    password: ''
})

const onChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
        ...credentials,
        [name]: value
    })
}
const onSubmit = (e) => {
    e.preventDefault();
    console.log("Données soumises :", credentials);

    const queryString = Object.keys(credentials)
        .map(key => key === 'email' ? `${key}=${encodeURIComponent(credentials[key])}` : `${key}=${credentials[key]}`)
        .join('&');

    axiosSpring.get(`/api/auth/login?${queryString}`)
        .then(res => {
            console.log(res);
            if (res.status === 200) {
            setAlert({
            type: ALERT_TYPES.SUCCESS.type,
            message: 'Utilisateur connecté avec succès.',
            icon: ALERT_TYPES.SUCCESS.icon
            });
            navigate('/*');
            } else {
            setAlert({
            type: ALERT_TYPES.ERROR.type,
            message: 'Erreur lors de la connexion.',
            icon: ALERT_TYPES.ERROR.icon
            });
            }
        })
        .catch(error => {
        setAlert({
        type: ALERT_TYPES.ERROR.type,
        message: 'Erreur lors de la connexion.',
        icon: ALERT_TYPES.ERROR.icon
        });
        });
}


return (

<div className='form'>
     <form onSubmit={onSubmit}>
        <div className='form-group'>
            <h1>Se connecter</h1>
        </div>
        <div className="form-group">
            <img src={myImage} alt="" className="class-img " />
            <label htmlFor="username">
            Nom d'utilisateur :
            </label>
            <input type='text'
            name='username'
            className="input form-control"
            placeholder="Username"
            value={credentials.username}
            onChange={onChange} />

        </div>
        <div className="form-group">
            <label htmlFor="password">
             Mot de passe :
             </label>
            <input type='password'
            name = 'password'
            className="input form-control"
            placeholder="Password"
            value={credentials.password}
            onChange={onChange}/>

        </div>
        <div className="form-group form-check inline">
            <input type="checkbox"
            className="form-check-input"
            id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
        </div>

        <div className="center-container form-group">
            <button type='submit'>
                Connexion
            </button>
        </div>
        <div className='form-group'>
            Nouveau ici ? <a href='/connexion/inscription' className='form-link'>S'inscrire</a>
        </div>
    </form>
</div>
    );
};

export default Login;
