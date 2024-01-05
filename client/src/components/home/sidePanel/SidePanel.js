import React, {useState} from 'react';
import './sidePanel.scss';
import {FaChevronLeft, FaChevronRight} from "react-icons/fa6";

const SidePanel = (props) => {
  const [displayed, setDisplayed] = useState(false);

  const handleToggle = (value) => {
    setDisplayed(value);
    let zoomBtn = document.getElementsByClassName('leaflet-control-zoom')[0];
    if(!value){
      zoomBtn.style.marginLeft = '1rem';
    }else{
      zoomBtn.style.marginLeft = '23rem';
    }
  };

  return (
    displayed ?
    <div className="sidePanel open">
      <button className="sidePanel__toggle open" onClick={() => handleToggle(false)} title="Lieux enregistrés">
        <FaChevronLeft/>
      </button>
      <div className='sidePanel__content'>
        {
          // TODO : onglets
        }
      </div>
    </div>
    :
    <div className="sidePanel close">
      <button className="sidePanel__toggle close" onClick={() => handleToggle(true)} title="Lieux enregistrés">
        <FaChevronRight/>
      </button>
    </div>
  )
  ;
};

export default SidePanel;