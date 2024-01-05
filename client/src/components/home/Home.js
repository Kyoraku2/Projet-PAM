import MainMap from "./MainMap";
import FilterList from "./FilterList";
import './homePage.scss';
import './radiusSubMenu.scss';
import {filters} from "../../utils/filters";
import SidePanel from "./sidePanel/SidePanel";
import { useState } from "react";

export const radiusOptions = [1, 5, 10, 20, 30, 50, 100];

// TODO : get all places from DB and display them on the map depending on the filters and the radius and the selected place/lists

const Home = (props) => {
  const [checkedPlaces, setCheckPlaces] = useState([]);
  const [checkedLists, setCheckLists] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);

  const [selectedRadius, setSelectedRadius] = useState(radiusOptions[0]);
  const [selectedRadiusID, setSelectedRadiusID] = useState(0);
  
  const handleCheckPlace = (e) => {
    if(e.target.checked){
      setCheckPlaces([...checkedPlaces, e.target.value]);
    }else{
      setCheckPlaces(checkedPlaces.filter(place => place !== e.target.value));
    }
  }

  const handleCheckList = (e) => {
    if(e.target.checked){
      setCheckLists([...checkedLists, e.target.value]);
    }else{
      setCheckLists(checkedLists.filter(list => list !== e.target.value));
    }
  }

  const handleActiveFilter = (event) => {
    if(event.target.value !== activeFilter){
      setActiveFilter(event.target.value);
    }else{
      setActiveFilter(undefined);
    }
  }

  const handleRadius = (radius) => {
    setSelectedRadius(radius);
  }

  const handleSlideRadius = (event) => {
    setSelectedRadius(radiusOptions[event.target.value]);
    setSelectedRadiusID(event.target.value);
  }

  
  return <section className='home'>
    <SidePanel class={'home'} checkedPlaces={checkedPlaces} onChange={handleCheckPlace} checkedLists={checkedLists} onChangeList={handleCheckList}/>
    <FilterList class={'home'} filters={filters} activeFilter={activeFilter} handleActiveFilter={handleActiveFilter}
                selectedRadius={selectedRadius} handleRadius={handleRadius} selectedRadiusID={selectedRadiusID} handleSlideRadius={handleSlideRadius}/>
    <MainMap class={'home'} />

  </section>
};

export default Home;