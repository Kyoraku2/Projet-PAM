import React, {useEffect, useState} from 'react';
import DefaultPP from '../../assets/images/defaultPp.png';
import {MdLogout} from "react-icons/md";
import {FaHome} from "react-icons/fa";
import {Link} from "react-router-dom";
import {FaUser} from "react-icons/fa6";
import {RiUserLocationFill} from "react-icons/ri";
import axiosSpring from "../../utils/axios/axiosSpring";

const ProfileCard = (props) => {
  const [ listDisplayed, setListDisplayed ] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    axiosSpring.get('/api/user/'+props.id+'/profileImage',
      {responseType: 'arraybuffer'})
      .then(response => {
        if(response.status === 200){
          let blob = new Blob([response.data], {type: 'image/png'});
          let url = URL.createObjectURL(blob);
          setImage(url);
        }else{
          setImage(DefaultPP);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [props.id]);

  const handleClick = () => {
    setListDisplayed(!listDisplayed);
  }

  return (
    <div className={props.class+'__profileCard'} onClick={handleClick}>
      <b>{props.name}</b>
      <img src={image} alt='Profile'/>
      { listDisplayed ?
        (
          <>
            <div className="clickToClose"></div>
            <div className={props.class+'__profileCard__list'}>
              <Link to='/'><FaHome/><span>Accueil</span></Link>
              <Link to='/profil'><FaUser/><span>Profile</span></Link>
              <Link to='/share-position'><RiUserLocationFill /><span>Positions</span></Link>
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