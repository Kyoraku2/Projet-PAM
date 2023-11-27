import React, {useState} from 'react';
import DefaultPP from '../../assets/images/defaultPp.png';

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
          <ul className='navbar__profileCard__list'>
            {/* TODO */}
          </ul>
        )
        :null
      }
    </div>
  );
};

export default ProfileCard;