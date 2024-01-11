import React, {useState} from 'react';
import './profile.scss';
import ProfileMainContent from "./ProfileMainContent";
import ProfileEdit from './ProfileEdit';
import ListsPage from '../list/ListsPage';
import PlacesPage from '../places/PlacesPage';
import SharePosition from '../position/SharePosition';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';

const Profile = (props) => {
  const [active, setActive] = useState(1); // [1, 2, 3, 4
  const [content, setContent] = useState(<ProfileMainContent/>);
  const [show, setShow] = useState(true);

  const handleChangeContent = (value) => {
    setActive(value);
    switch (value) {
      case 1:
        setContent(<ProfileMainContent/>);
        break;
      case 2:
        setContent(<ProfileEdit/>);
        break;
      case 3:
        setContent(<ListsPage/>);
        break;
      case 4:
        setContent(<PlacesPage/>);
        break;
      case 5:
        setContent(<SharePosition/>);
        break;
      default:
        setContent(<ProfileMainContent/>);
        break;
    }
  }

  const handleShow = () => {
    // Change width of nav
    const nav = document.querySelector('.profile__nav');
    const items = document.querySelectorAll('.profile__nav__item');
    if(nav) {
      if(show) {
        // Nav
        nav.style.width = '0';
        // Items
        if(items) {
          items.forEach(item => {
            item.style.opacity = '0';
          });
        }
      }else{
        // Nav
        nav.style.width = '10rem';
        // Items
        if(items) {
          items.forEach(item => {
            item.style.opacity = '1';
          });
        }
      }
    }
    setShow(!show);
  }


  return (
    <section className="profile">
      <div className="profile__nav">
        <div className={"profile__nav__item" + (active === 1 ? ' active':'')} onClick={() => handleChangeContent(1)}>Profile</div>
        <div className={"profile__nav__item" + (active === 2 ? ' active':'')} onClick={() => handleChangeContent(2)}>Editer</div>
        <div className={"profile__nav__item" + (active === 3 ? ' active':'')} onClick={() => handleChangeContent(3)}>Listes</div>
        <div className={"profile__nav__item" + (active === 4 ? ' active':'')} onClick={() => handleChangeContent(4)}>Lieux</div>
        <div className={"profile__nav__item" + (active === 5 ? ' active':'')} onClick={() => handleChangeContent(5)}>Positions</div>
        <button className="profile__nav__show" onClick={handleShow}>{show ? <FaChevronLeft /> : <FaChevronRight />}</button>
      </div>
      {content}
    </section>
  );
};

export default Profile;