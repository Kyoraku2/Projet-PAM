import React from 'react';
import './list.scss';
import ListCollection from "./ListCollection";
//import Tabs from "./Tabs";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

const ListsPage = (props) => {

    return (
            <Tabs className="listsPage">
                <TabList>
                    <Tab>Mes listes</Tab>
                    <Tab>Partagées</Tab>
                </TabList>
                <TabPanel>
                    <ListCollection class="listsPage"/>
                </TabPanel>
                <TabPanel>
                    <ListCollection class="listsPage"/>
                </TabPanel>
            </Tabs>
    );
};

export default ListsPage;