import MainMap from "./MainMap";
import FilterList from "./FilterList";
import './homePage.scss';
import './radiusSubMenu.scss';
import {filters} from "../../utils/filters";
import SidePanel from "./sidePanel/SidePanel";
import {useContext, useEffect, useState} from "react";
import axiosSpring from "../../utils/axios/axiosSpring";
import AlertContext from "../context/alerts/AlertContext";
import {ALERT_TYPES} from "../context/alerts/Alert";
import AuthContext from "../context/AuthContext";

export const radiusOptions = [1, 5, 10, 20, 30, 50, 100];

const Home = (props) => {
  const {setAlert} = useContext(AlertContext);
  const {auth} = useContext(AuthContext);

  const [fetched, setFetched] = useState(false);

  const [checkedPlaces, setCheckPlaces] = useState([]);
  const [checkedLists, setCheckLists] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);

  const [selectedRadius, setSelectedRadius] = useState(radiusOptions[0]);
  const [selectedRadiusID, setSelectedRadiusID] = useState(0);

  const [places, setPlaces] = useState([]);
  const [lists, setLists] = useState([]);

  const [placesMarkers, setPlacesMarkers] = useState([]);

  const handleCheckPlace = (e) => {

    if(e.target.checked){
      setCheckPlaces([...checkedPlaces, e.target.value]);
      setPlacesMarkers([...placesMarkers, places.find(place => place.id === parseInt(e.target.value))]);
    }else{
      setCheckPlaces(checkedPlaces.filter(place => place !== e.target.value));
      // remove ONLY one iteration of the place from placesMarkers
      let index = placesMarkers.findIndex(place => place.id === parseInt(e.target.value));
      if(index !== -1){
        let newPlacesMarkers = [...placesMarkers];
        newPlacesMarkers.splice(index, 1);
        setPlacesMarkers(newPlacesMarkers);
      }
    }
  }

  const handleCheckList = (e) => {
    if(e.target.checked){
      setCheckLists([...checkedLists, e.target.value]);
      // add list places to placesMarkers
      let listPlaces = lists.find(list => list.id === parseInt(e.target.value)).places;
      setPlacesMarkers([...placesMarkers, ...listPlaces]);
    }else{
      setCheckLists(checkedLists.filter(list => list !== e.target.value));
      // remove only one iteration of each of the list places from placesMarkers
      let listPlaces = lists.find(list => list.id === parseInt(e.target.value)).places;
      let newPlacesMarkers = [...placesMarkers];
      listPlaces.forEach(place => {
        let index = newPlacesMarkers.findIndex(p => p.id === place.id);
        if(index !== -1){
          newPlacesMarkers.splice(index, 1);
        }
      });
      setPlacesMarkers(newPlacesMarkers);
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
    console.log(radius);
  }

  const handleSlideRadius = (event) => {
    setSelectedRadius(radiusOptions[event.target.value]);
    setSelectedRadiusID(event.target.value);
  }

  useEffect(() => {
    if(!fetched){
      setFetched(true);
      axiosSpring.get('/api/places/user/' + auth.id)
        .then((response) => {
          if(response.status === 200) {
            setPlaces(response.data);
          }else{
            setAlert({
              type: ALERT_TYPES.ERROR.type,
              message: 'Erreur lors de la récupération des lieux',
              icon: ALERT_TYPES.ERROR.icon
            });
          }
        })
        .catch((error) => {
          console.log(error);
          setAlert({
            type: ALERT_TYPES.ERROR.type,
            message: 'Erreur lors de la récupération des lieux',
            icon: ALERT_TYPES.ERROR.icon
          });
        });

      axiosSpring.get('/api/lists/user/' + auth.id)
        .then((response) => {
          if(response.status === 200) {
            setLists(response.data);
          }else{
            setAlert({
              type: ALERT_TYPES.ERROR.type,
              message: 'Erreur lors de la récupération des listes',
              icon: ALERT_TYPES.ERROR.icon
            });
          }
        })
        .catch((error) => {
          console.log(error);
          setAlert({
            type: ALERT_TYPES.ERROR.type,
            message: 'Erreur lors de la récupération des listes',
            icon: ALERT_TYPES.ERROR.icon
          });
        });
    }
  }, [checkedPlaces, checkedLists, activeFilter, selectedRadius, selectedRadiusID, auth]);

  
  return <section className='home'>
    <SidePanel class={'home'} checkedPlaces={checkedPlaces} onChange={handleCheckPlace} checkedLists={checkedLists} onChangeList={handleCheckList}/>
    <FilterList class={'home'} filters={filters} activeFilter={activeFilter} handleActiveFilter={handleActiveFilter}
                selectedRadius={selectedRadius} handleRadius={handleRadius} selectedRadiusID={selectedRadiusID} handleSlideRadius={handleSlideRadius}/>
    <MainMap class={'home'} places={placesMarkers} activeFilter={activeFilter} radius={selectedRadius}/>

  </section>
};

export default Home;