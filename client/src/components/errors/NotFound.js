import React from 'react';
import {Link} from "react-router-dom";
import './errorPage.scss';

// TODO : make it funnier maybe?
const NotFound = () => {
  return (
    <section className='errorPage'>
      <article className='errorPage__content'>
        <h1>OH NON !</h1>
        <h2>Où sommes-nous ?</h2>
        <p>La page recherchée a été supprimée, déplacées, rénommée ou n'existe pas...</p>
        <Link to={"/"}>Retourner à l'accueil</Link>
      </article>
    </section>
  );
};

export default NotFound;