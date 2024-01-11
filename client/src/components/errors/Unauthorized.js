import React from 'react';
import {Link} from "react-router-dom";

const NotFound = () => {
  return (
    <section className='notFound'>
      <article>
        <h1>401 - Unauthorized</h1>
        <p>Vous n'avez pas accès à la page recherchée...</p>
        <Link to={"/"}>Essayez de vous connecter pour voir !</Link>
      </article>
    </section>
  );
};

export default NotFound;