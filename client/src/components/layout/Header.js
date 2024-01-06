import React, {useEffect, useState} from 'react';
import logo from '../../assets/images/logo.png';
import {Link} from "react-router-dom";
import ProfileCard from "./ProfileCard";
import './header.scss';
import {FaListUl, FaMapMarkerAlt, FaRegPlusSquare} from "react-icons/fa";
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
        <ul className='nav__link'>
          <li className='nav__link__item'>
            <Link to={'/places'}>
              Lieux
            </Link>
          </li>
          <li className='nav__link__item'>
            <Link to={'/lists'}>
              Listes
            </Link>
          </li>
        </ul>

        {/*}
        <div className='nav__search'>
          <form>
            <input type='text' placeholder='Rerchercher...'/>
            <button type='submit'>
              <FaSearch/>
            </button>
          </form>
        </div>
        */}

        <div className='nav__right'>
          {
          /*
          <a className='nav__right__create' href='/places/create'>
            Créer un lieu
          </a>
          */}

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
          <Link to={'/places'}>
            <FaMapMarkerAlt/>
            <span>Lieux</span>
          </Link>
        </li>

        <li className={'nav__links__item ' + (activeLink === 2 ? 'nav__links__item--active':'')}
            onClick={() => handleActiveLink(2)}
        >
          <Link to={'/places/create'}>
            <FaRegPlusSquare/>
            <span>Créer</span>
          </Link>
        </li>

        <li className={'nav__links__item ' + (activeLink === 3 ? 'nav__links__item--active':'')}
            onClick={() => handleActiveLink(3)}
        >
          <Link to={'/lists'}>
            <FaListUl />
            <span>Listes</span>
          </Link>
        </li>

        <li className={'nav__links__item ' + (activeLink === 4 ? 'nav__links__item--active':'')}
            onClick={() => handleActiveLink(4)}
        >
          <Link to={'/profil'}>
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