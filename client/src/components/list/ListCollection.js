import React, { useContext, useEffect, useState } from 'react';
import ListPreview from "./ListPreview";
import './list.scss';
import axiosSpring from '../../utils/axios/axiosSpring';
import AlertContext from '../context/alerts/AlertContext';
import { ALERT_TYPES } from '../context/alerts/Alert';

const ListCollection = (props) => {
    const {setAlert} = useContext(AlertContext);

    const [lists, setLists] = useState([]);

    useEffect(() => {
        axiosSpring.get('/api/lists/user/'+ 1 + (props.shared ?'?shared=true':'')) // TODO: get user id from context
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
                setAlert({
                    type: ALERT_TYPES.ERROR.type,
                    message: 'Erreur lors de la récupération des listes',
                    icon: ALERT_TYPES.ERROR.icon
                  });
            });
    }, [setAlert, setLists, props]);

    return (
        <div className={props.class+'__listCollection'}>
            {lists.map((list) => {
                return (
                    <ListPreview key={list.id} id={list.id} class = {props.class+'__listCollection'}/>
                );
            })}
        </div>
    );
};

export default ListCollection;