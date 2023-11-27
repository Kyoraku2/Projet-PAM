import React, {useEffect, useState} from 'react';
import logo from '../../assets/images/logo.svg';
import {Link} from "react-router-dom";
import ProfileCard from "./ProfileCard";
import './header.scss';
import {FaMapMarkerAlt, FaRegPlusSquare, FaSearch} from "react-icons/fa";
import {FaMap, FaUser} from "react-icons/fa6";

const Header = () => {
  const MEDIA_QUERY = 600;
  const [isMobile, setIsMobile] = useState(false);
  const [activeLink, setActiveLink] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MEDIA_QUERY);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleActiveLink(index) {
    setActiveLink(index);
  }

  return (<header className='nav'>
    {!isMobile ? (
      <>
        <Link to={'/'} className='nav__logo'>
          <img src={logo} alt='Application logo'/>
        </Link>

        <div className='nav__search'>
          <form>
            <input type='text' placeholder='Rerchercher...'/>
            <button type='submit'>
              <FaSearch/>
            </button>
          </form>
        </div>

        <div className='nav__right'>
          <button className='nav__right__create'>
            Ajouter un lieu
          </button>

          <ProfileCard class='nav__right'/>
        </div>
      </>
      ):(
      <ul className='nav__links'>
        <li className={'nav__links__item ' + (activeLink === 0 ? 'nav__links__item--active':'')}
            onClick={() => handleActiveLink(0)}
        >
          <Link to={'/'}>
            <FaMap/>
            <span>Carte</span>
          </Link>
        </li>

        <li className={'nav__links__item ' + (activeLink === 1 ? 'nav__links__item--active':'')}
          onClick={() => handleActiveLink(1)}
        >
          <Link to={'/todo'}>
            <FaMapMarkerAlt/>
            <span>Lieux</span>
          </Link>
        </li>

        <li className={'nav__links__item ' + (activeLink === 2 ? 'nav__links__item--active':'')}
            onClick={() => handleActiveLink(2)}
        >
          <Link to={'/todo'}>
            <FaRegPlusSquare/>
            <span>Créer</span>
          </Link>
        </li>

        <li className={'nav__links__item ' + (activeLink === 3 ? 'nav__links__item--active':'')}
            onClick={() => handleActiveLink(3)}
        >
          <Link to={'/todo'}>
            <FaSearch/>
            <span>Rechercher</span>
          </Link>
        </li>

        <li className={'nav__links__item ' + (activeLink === 4 ? 'nav__links__item--active':'')}
            onClick={() => handleActiveLink(4)}
        >
          <Link to={'/todo'}>
            <FaUser/>
            <span>Profil</span>
          </Link>
        </li>

      </ul>
      )
    }
  </header>);
};

export default Header;