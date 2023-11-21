import React from 'react';
import {Link} from "react-router-dom";

// TODO : make it funnier maybe?
const NotFound = () => {
  return (
    <section className='notFound'>
      <article>
        <h1>404 - Not Found</h1>
        <p>La page recherchée n'existe pas...</p>
        <Link to={"/"}>Retourner à l'accueil</Link>
      </article>
    </section>
  );
};

export default NotFound;