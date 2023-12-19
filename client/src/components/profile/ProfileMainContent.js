import React from 'react';
import DefaultPP from "../../assets/images/defaultPp.png";

const ProfileMainContent = (props) => {
  return (
    <div className="profile__content">
      <div className="profile__content__item">
        <h2>Laissez les autres utilisateurs en connaître plus à propos de vous en choisissant une belle photo de profile.</h2>
        <article>
          <h3>Image de profile</h3>
          <div>
            <img src={DefaultPP} alt='profile'/>
            <div>
              <p>Parfait !</p>
              <p>Cette images vous représente à travers tout le site :)</p>
            </div>
          </div>
        </article>
      </div>
      <div className="profile__content__item">
        <h2>A propos de vous</h2>
        <form>
          <h3>Informations personnelles</h3>
          <label htmlFor='username'>Username</label>
          <input type="text" id='username' name='username' readOnly></input>
          <label htmlFor='email'>Email</label>
          <input type="text" id='email' name='email' readOnly></input>
          <label htmlFor='description'>Bio</label>
          <textarea type="text" id='description' name='description' readOnly></textarea>
        </form>
      </div>
    </div>
  );
};

export default ProfileMainContent;