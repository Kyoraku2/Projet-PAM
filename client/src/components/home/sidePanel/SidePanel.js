import React, {useState} from 'react';
import './sidePanel.scss';
import './collections.scss'
import {FaChevronLeft, FaChevronRight} from "react-icons/fa6";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import PlacesCollectionCheckbox from './PlacesCollectionCheckbox';
import ListCollectionCheckbox from "./ListCollectionCheckbox";

const SidePanel = (props) => {
  const [displayed, setDisplayed] = useState(false);

  const handleToggle = (value) => {
    setDisplayed(value);
    let zoomBtn = document.getElementsByClassName('leaflet-control-zoom')[0];
    let centerBtn = document.getElementsByClassName('home__map__center')[0];
    if(!value){
      zoomBtn.style.marginLeft = '1rem';
      centerBtn.style.marginLeft = '0';
    }else{
      zoomBtn.style.marginLeft = '23rem';
      centerBtn.style.marginLeft = '22rem';
    }
  };

  return (
    displayed ?
    <div className="sidePanel open">
      <button className="sidePanel__toggle open" onClick={() => handleToggle(false)} title="Lieux enregistrés">
        <FaChevronLeft/>
      </button>
      <Tabs className="sidePanel__content">
        <TabList>
            <Tab>Mes listes</Tab>
            <Tab>Mes lieux</Tab>
        </TabList>
        <TabPanel>
          <ListCollectionCheckbox onChange={props.onChangeList} checkedPlaces={props.checkedLists}/>
        </TabPanel>
        <TabPanel>
          <PlacesCollectionCheckbox onChange={props.onChange} checkedPlaces={props.checkedPlaces}/>
        </TabPanel>
      </Tabs>
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