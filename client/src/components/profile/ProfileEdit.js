import React from 'react';
import DefaultPP from "../../assets/images/defaultPp.png";

const ProfileEdit = (props) => {
  return (
    <div className="profile__content">
      <div className="profile__content__item">
        <h2>Laissez les autres utilisateurs en connaître plus à propos de vous en choisissant une belle photo de profile.</h2>
        <article>
          <h3># Changer votre image de profile</h3>
          <div>
            <img src={DefaultPP} alt='profile'/>
            <label htmlFor='profile_picture'>
                <div>
                    <p>Choisir une image...</p>
                    <p>Une image carrée serait parfait ;)</p>
                    <p>Taille maximum : 5mb</p>
                </div>
            </label>
            <input type="file" id='profile_picture' name='profile_picture'></input>
          </div>
        </article>
      </div>
      <div className="profile__content__item">
        <h2>A propos de vous</h2>
        <form>
            <h3># Changer vos informations personnelles</h3>
            <label htmlFor='username'>Username</label>
            <input type="text" id='username' name='username'></input>
            <label htmlFor='email'>Email</label>
            <input type="text" id='email' name='email'></input>
            <label htmlFor='description'>Bio</label>
            <textarea id='description' name='description'></textarea>
            <label htmlFor='current_password'>Mot de passe courant</label>
            <input type="password" id='current_password' name='current_password'></input>
            <label htmlFor='new_password'>Nouveau mot de passe<span>Tips : laissez vide si aucun changement</span></label>
            <input type="password" id='new_password' name='new_password'></input>
            <button type='submit'>Enregistrer</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;