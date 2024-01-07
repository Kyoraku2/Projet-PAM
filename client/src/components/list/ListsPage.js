import React from 'react';
import './list.scss';
import ListCollection from "./ListCollection";
//import Tabs from "./Tabs";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {IoAddCircle} from 'react-icons/io5';

const ListsPage = (props) => {

    return (
        <>
            {
                props.canCreate ?
                  <a href='/lists/create' className="addBtn" title='Créer une liste de lieux'><IoAddCircle /></a>
                  :null
            }
            <Tabs className="listsPage">
                <TabList>
                    <Tab>Mes listes</Tab>
                    <Tab>Partagées</Tab>
                </TabList>
                <TabPanel>
                    <ListCollection class="listsPage" shared={false}/>
                </TabPanel>
                <TabPanel>
                    <ListCollection class="listsPage" shared={true}/>
                </TabPanel>
            </Tabs>
        </>
    );
};

export default ListsPage;