import './connexion.scss';
import myImage from '../../assets/images/logo.svg';
import {useContext, useEffect, useState} from 'react';
import axiosSpring from '../../utils/axios/axiosSpring';
import {useNavigate} from 'react-router-dom';
import {ALERT_TYPES} from '../context/alerts/Alert';
import AlertContext from '../context/alerts/AlertContext';
import {SHA256} from "crypto-js";
import AuthContext from "../context/AuthContext";
import {COOKIE_MINUTE_TO_EXPIRE, COOKIE_USER_KEY} from "../../utils/consts";
import {isLogged, setCookie} from "../../utils/functions";

const Login = () => {
  const {setAuth} = useContext(AuthContext);
  const navigate = useNavigate()

  const {setAlert} = useContext(AlertContext);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if(isLogged()){
      navigate('/');
    }
  }, [navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    const hashedPassword = SHA256(password).toString();
    axiosSpring.get(`/api/auth/login?password=${hashedPassword}&username=${username}`)
      .then(res => {
        if (res.status === 200) {
          setAuth({
            username: res.data.username,
            accessToken: res.data.jwt,
            id: res.data.id
          });
          setCookie(COOKIE_USER_KEY, {
            username: res.data.username,
            accessToken: res.data.jwt,
            id: res.data.id
          }, COOKIE_MINUTE_TO_EXPIRE);
          setAlert({
            type: ALERT_TYPES.SUCCESS.type,
            message: 'Utilisateur connecté avec succès.',
            icon: ALERT_TYPES.SUCCESS.icon
          });
          navigate('/');
        } else {
          setAlert({
            type: ALERT_TYPES.ERROR.type,
            message: 'Erreur lors de la connexion.',
            icon: ALERT_TYPES.ERROR.icon
          });
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          setError('Nom d\'utilisateur ou mot de passe incorrect.');
        } else {
          setAlert({
            type: ALERT_TYPES.ERROR.type,
            message: 'Erreur lors de la connexion.',
            icon: ALERT_TYPES.ERROR.icon
          });
        }
      });
  }


  return (
    <section className="login">
      <img src={myImage} alt="" className="class-img "/>
      <h1>Se connecter</h1>
      <form onSubmit={onSubmit} className="login__form">
        <div className="login__form__group">
          <label htmlFor="username">
            Nom d'utilisateur :
          </label>
          <input type='text'
                 name='username'
                 placeholder="Username"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}/>
        </div>

        <div className="login__form__group">
          <label htmlFor="password">
            Mot de passe :
          </label>
          <input type='password'
                 name='password'
                 placeholder="Password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}/>

        </div>

        {
          error ? <p className="login__form__error">{error}</p> : null
        }

        {/*<div className="form-group form-check inline">
          <input type="checkbox"
                 className="form-check-input"
                 id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
        </div>*/}

        <button type='submit'>
          Connexion
        </button>
      </form>
      <div className='login__register'>
        Nouveau ici ? <a href='/register'>S'inscrire</a>
      </div>
    </section>
)
  ;
};

export default Login;
