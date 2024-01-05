import React, {useState} from 'react';
import DefaultPP from '../../assets/images/defaultPp.png';
import {MdLogout} from "react-icons/md";
import {FaHome} from "react-icons/fa";
import {Link} from "react-router-dom";
import {FaUser} from "react-icons/fa6";

const ProfileCard = (props) => {
  const [ listDisplayed, setListDisplayed ] = useState(false);

  const handleClick = () => {
    setListDisplayed(!listDisplayed);
  }

  return (
    <div className={props.class+'__profileCard'} onClick={handleClick}>
      <b>Nom</b>
      <img src={DefaultPP} alt='Profile'/>
      { listDisplayed ?
        (
          <>
            <div className="clickToClose"></div>
            <div className={props.class+'__profileCard__list'}>
              <Link to='/'><FaHome/><span>Accueil</span></Link>
              <Link to='/profil'><FaUser/><span>Profile</span></Link>
              <Link to='/logout'><MdLogout/><span>Déconnexion</span></Link>
            </div>
          </>
        )
        :null
      }
    </div>
  );
};

export default ProfileCard;