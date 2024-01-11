import React, {useContext, useEffect, useState} from 'react';
import {ALERT_TYPES} from '../context/alerts/Alert';
import axiosSpring from '../../utils/axios/axiosSpring';
import AlertContext from '../context/alerts/AlertContext';
import myImage from "../../assets/images/logo.png";
import {INVALID_CHARS, isEmailValid} from "../../utils/consts";
import {SHA256} from "crypto-js";
import {useNavigate} from "react-router-dom";
import {isLogged} from "../../utils/functions";

const UserAdd = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const {setAlert} = useContext(AlertContext);
  const [user, setUser] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    email: ''
  });

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [conditionCheckedError, setConditionCheckedError] = useState(false);

  useEffect(() => {
    if(isLogged()){
      navigate('/');
    }
  }, [navigate]);

  const onChange = (e) => {
    const {name, value} = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setUsernameError('');
    setPasswordError('');
    setEmailError('');
    setPasswordConfirmError('');
    setConditionCheckedError(false);

    // Check username
    if (user.username === null || user.username === undefined || user.username === '') {
      setUsernameError('Veuillez renseigner un surnom.');
      return;
    }

    // Check if no invalid caracters
    for (let i = 0; i < INVALID_CHARS.length; i++) {
      if (user.username.includes(INVALID_CHARS[i])) {
        setUsernameError(
          'Le surnom ne doit pas contenir de caractères spéciaux (sauf - et _).'
        );
        return;
      }
    }

    // Check email
    if (user.email === null || user.email === undefined || user.email === '') {
      setEmailError('Veuillez renseigner un email.');
      return;
    }

    // Check if its a valid email
    if (!isEmailValid(user.email)) {
      setEmailError('Veuillez renseigner un email valide.');
      return;
    }

    // Check password
    if (user.password === '' || user.password === null || user.password === undefined) {
      setPasswordError('Veuillez renseigner votre mot de passe.');
      return;
    }

    // Check password confirm
    if (user.passwordConfirm === '' || user.passwordConfirm === null || user.passwordConfirm === undefined) {
      setPasswordConfirmError('Les mots doivent être identiques.');
      return;
    }

    if (user.password !== user.passwordConfirm) {
      setPasswordConfirmError('Les mots doivent être identiques.');
      return;
    }

    if (isChecked === false) {
      setConditionCheckedError(true);
      return;
    }

    // Hash password
    const hashedPassword = SHA256(user.password).toString();
    axiosSpring.post('/api/auth/register?password=' + hashedPassword + '&username=' + user.username + '&email=' + user.email)
      .then(response => {
        if (response.status === 200) {
          navigate('/login');
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
    <section className="login">
      <img src={myImage} alt="" className="class-img "/>
      <h1>S'inscrire</h1>
      <form onSubmit={onSubmit} className="login__form">
        <div className="login__form__group">
          <label htmlFor="username">Nom d'utilisateur:</label>
          <input
            type='text'
            name="username"
            placeholder="Entrez votre nom d'utilisateur"
            value={user.username}
            onChange={onChange}
          />
          {
            usernameError !== '' ?
              <p className="login__form__group__error">{usernameError}</p>
              : null
          }
        </div>
        <div className="login__form__group">
          <label htmlFor="email">Mail:</label>
          <input
            type='email'
            name="email"
            placeholder="Entrez votre adresse e-mail"
            value={user.email}
            onChange={onChange}
          />
          {
            emailError !== '' ?
              <p className="login__form__group__error">{emailError}</p>
              : null
          }
        </div>
        <div className="login__form__group">
          <label htmlFor="password">Mot de passe:</label>
          <input
            type='password'
            name="password"
            placeholder="Entrez votre mot de passe"
            value={user.password}
            onChange={onChange}
          />
          {
            passwordError !== '' ?
              <p className="login__form__group__error">{passwordError}</p>
              : null
          }
        </div>

        <div className="login__form__group">
          <label htmlFor="passwordConfirm">Confirmer mot de passe:</label>
          <input
            type='password'
            name="passwordConfirm"
            placeholder="Confirmez votre mot de passe"
            value={user.passwordConfirm}
            onChange={onChange}
          />
          {
            passwordConfirmError !== '' ?
              <p className="login__form__group__error">{passwordConfirmError}</p>
              : null
          }
        </div>

        <div className={"login__form__group check" + (conditionCheckedError ? ' checkError' : '')}>
          <input
            type="checkbox"
            id="exampleCheck1"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label htmlFor="exampleCheck1">
            J'accepte les conditions générales d'utilisation
          </label>
        </div>
        <button type='submit'>
          S'inscrire
        </button>
      </form>
      <div className='login__register'>
        Déjà un compte ? <a href='/login'>Se connecter</a>
      </div>
    </section>
  );

}
export default UserAdd;
