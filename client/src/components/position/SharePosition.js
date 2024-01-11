import React, {useContext, useEffect, useState} from 'react';
import AlertContext from "../context/alerts/AlertContext";
import {FaShareAlt} from "react-icons/fa";
import './position.scss';
import {IoClose} from "react-icons/io5";
import axiosSpring from "../../utils/axios/axiosSpring";
import {ALERT_TYPES} from "../context/alerts/Alert";
import AuthContext from "../context/AuthContext";

const SharePosition = (props) => {
  const  {setAlert} = useContext(AlertContext);
  const {auth} = useContext(AuthContext);

  const [friendThatSharePosition, setFriendThatSharePosition] = useState([]);
  const [sharePositionWith, setSharePositionWith] = useState([]);

  useEffect(() => {
    axiosSpring.get('/api/users/' + auth.id + '/shareWith')
      .then((response) => {
        if(response.status === 200) {
          if(response.data.length > 0){
            setSharePositionWith(response.data);
          }
        }else{
          setAlert({
            type: ALERT_TYPES.ERROR.type,
            message: 'Erreur lors de la récupération des amis avec qui vous partagez votre position',
            icon: ALERT_TYPES.ERROR.icon
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axiosSpring.get('/api/users/' + auth.id + '/shareBy')
      .then((response) => {
        if(response.status === 200) {
          if(response.data.length > 0){
            setFriendThatSharePosition(response.data);
          }
        }else{
          setAlert({
            type: ALERT_TYPES.ERROR.type,
            message: 'Erreur lors de la récupération des amis qui partagent leur position avec vous',
            icon: ALERT_TYPES.ERROR.icon
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setAlert, setFriendThatSharePosition, setSharePositionWith,auth]);

  const handleSharePosition = () => {
    const username = window.prompt("Avec qui voulez-vous partager votre position ?");

    if(username !== null || username !== ''){
      axiosSpring.patch('/api/users/' + auth.id + '/shareWith/' + username)
        .then((response) => {
          if(response.status === 200) {
            setSharePositionWith([...sharePositionWith, response.data]);
            setAlert({
              type: ALERT_TYPES.SUCCESS.type,
              message: 'position partagée avec succès',
              icon: ALERT_TYPES.SUCCESS.icon
            });
          }else{
            if(response.status === 204){
              setAlert({
                type: ALERT_TYPES.WARNING.type,
                message: 'Cet utilisateur est déjà dans votre liste',
                icon: ALERT_TYPES.WARNING.icon
              });
            }else{
              setAlert({
                type: ALERT_TYPES.ERROR.type,
                message: 'Erreur lors du partage de la position',
                icon: ALERT_TYPES.ERROR.icon
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
          setAlert({
            type: ALERT_TYPES.ERROR.type,
            message: 'Erreur lors du partage de la position',
            icon: ALERT_TYPES.ERROR.icon
          });
        });
    }
  }

  const handleStopShareWith = (id) => {
    if(!window.confirm("Voulez-vous vraiment arrêter de partager votre position avec cette personne ?")){
      return ;
    }
    axiosSpring.delete('/api/users/' + auth.id + '/shareWith/' + id)
      .then((response) => {
        if(response.status === 200) {
          setSharePositionWith(sharePositionWith.filter((friend) => friend.id !== id));
          setAlert({
            type: ALERT_TYPES.SUCCESS.type,
            message: 'position arrêtée avec succès',
            icon: ALERT_TYPES.SUCCESS.icon
          });
        }else{
          setAlert({
            type: ALERT_TYPES.ERROR.type,
            message: 'Erreur lors de l\'arrêt du partage de la position',
            icon: ALERT_TYPES.ERROR.icon
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setAlert({
          type: ALERT_TYPES.ERROR.type,
          message: 'Erreur lors de l\'arrêt du partage de la position',
          icon: ALERT_TYPES.ERROR.icon
        });
      });

  }

  const handleStopShareFrom = (id) => {
    if(!window.confirm("Voulez-vous vraiment arrêter de suivre cette personne ?")){
      return ;
    }
    axiosSpring.delete('/api/users/' + auth.id + '/shareBy/' + id)
      .then((response) => {
        if(response.status === 200) {
          setFriendThatSharePosition(friendThatSharePosition.filter((friend) => friend.id !== id));
          setAlert({
            type: ALERT_TYPES.SUCCESS.type,
            message: 'position arrêtée avec succès',
            icon: ALERT_TYPES.SUCCESS.icon
          });
        }else{
          setAlert({
            type: ALERT_TYPES.ERROR.type,
            message: 'Erreur lors de l\'arrêt du partage de la position',
            icon: ALERT_TYPES.ERROR.icon
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setAlert({
          type: ALERT_TYPES.ERROR.type,
          message: 'Erreur lors de l\'arrêt du partage de la position',
          icon: ALERT_TYPES.ERROR.icon
        });
      });
  }

  return (
    <section className="position">
      <div className="position__item">
        <h1>Partager ma position</h1>
        <p>Vous pouvez partager votre position en temps réel avec vos amis.</p>
        <button className="position__item__share" title="Partager" onClick={handleSharePosition}><FaShareAlt />Partager ma position</button>
      </div>

      <div className="position__item">
        <h1>Ma position</h1>
        <p>Retrouvez ici les amis avec qui vous partagez votre position.</p>
        <ul className="position__item__list">
          {sharePositionWith.map((friend,id) => {
            return (
              <li key={'friend-'+id}>
                <span>{friend.username}</span>
                {
                  friend.id !== -1 &&
                  <button className="position__item__list__stop" title={"Arrêter de partager"} onClick={() => handleStopShareWith(friend.id)}><IoClose/></button>
                }
              </li>
            )
          })}
        </ul>
      </div>

      <div className="position__item">
        <h1>Position de mes amis</h1>
        <p>Retrouvez ici les amis qui partagent leur position avec vous.</p>
        <ul className="position__item__list">
          {friendThatSharePosition.map((friend,id) => {
            return (
              <li key={'friend-'+id}>
                <span>{friend.username}</span>
                {
                  friend.id !== -1 &&
                  <button className="position__item__list__stop" title={"Arrêter de suivre"} onClick={() => handleStopShareFrom(friend.id)}><IoClose/></button>
                }
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  );
};

export default SharePosition;