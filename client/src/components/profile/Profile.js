import React, {useState} from 'react';
import './profile.scss';
import ProfileMainContent from "./ProfileMainContent";
import ProfileEdit from './ProfileEdit';
import ListsPage from '../list/ListsPage';

const Profile = (props) => {
  const [active, setActive] = useState(1); // [1, 2, 3, 4
  const [content, setContent] = useState(<ProfileMainContent/>);

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
        setContent(<div>4</div>);
        break;
      case 5:
        setContent(<div>5</div>);
        break;
      default:
        setContent(<ProfileMainContent/>);
        break;
    }
  }


  return (
    <section className="profile">
      <div className="profile__nav">
        <div className={"profile__nav__item" + (active === 1 ? ' active':'')} onClick={() => handleChangeContent(1)}>Profile</div>
        <div className={"profile__nav__item" + (active === 2 ? ' active':'')} onClick={() => handleChangeContent(2)}>Editer</div>
        <div className={"profile__nav__item" + (active === 3 ? ' active':'')} onClick={() => handleChangeContent(3)}>Listes</div>
        <div className={"profile__nav__item" + (active === 4 ? ' active':'')} onClick={() => handleChangeContent(4)}>Lieux</div>
        <div className={"profile__nav__item" + (active === 5 ? ' active':'')} onClick={() => handleChangeContent(5)}>Favoris</div>
      </div>
      {content}
    </section>
  );
};

export default Profile;