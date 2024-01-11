import React from 'react';
import './place.scss';
import PlaceCollection from "./PlaceCollection";
//import Tabs from "./Tabs";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {IoAddCircle} from 'react-icons/io5';

const PlacesPage = (props) => {

    return (
        <>

            <Tabs className="placesPage">
                <TabList>
                    <Tab>Mes Lieux</Tab>
                    <Tab>Favoris</Tab>
                </TabList>
                <TabPanel>
                    <PlaceCollection class="placesPage" favorites={false}/>
                </TabPanel>
                <TabPanel>
                    <PlaceCollection class="placesPage" favorites={true}/>
                </TabPanel>
            </Tabs>
            {
                props.canCreate ?
                    <a href='/places/create' className="addBtn" title='Créer un lieu'><IoAddCircle /></a>
                    :null
            }
        </>
    );
};

export default PlacesPage;