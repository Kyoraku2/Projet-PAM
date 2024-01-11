import React, {useContext, useEffect, useState} from 'react';
import ListPreview from "./ListPreview";
import './list.scss';
import axiosSpring from '../../utils/axios/axiosSpring';
import AlertContext from '../context/alerts/AlertContext';
import {ALERT_TYPES} from '../context/alerts/Alert';
import {CgMenuGridR} from "react-icons/cg";
import {SlList} from "react-icons/sl";
import AuthContext from "../context/AuthContext";

const ListCollection = (props) => {
    const {setAlert} = useContext(AlertContext);
    const {auth} = useContext(AuthContext);

    const [lists, setLists] = useState([]);
    const [view, setView] = useState('card');

    useEffect(() => {
        axiosSpring.get('/api/lists/user/'+ auth.id + (props.shared ?'?shared=true':''))
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
    }, [setAlert, setLists, props, auth]);

    const handleChangeView = (e) => {
        setView(e.target.value);
    }

    return (
        <div className={props.class+'__listCollection '+ view}>

            {lists.map((list) => {
                return (
                    <ListPreview key={list.id} id={list.id} class = {props.class+'__listCollection'}/>
                );
            })}

            <div className="view">

                <input type="checkbox" name="view" value="card" checked={view==="card"} id="radioCard" onChange={handleChangeView}/>
                <label className="labelForChecked" htmlFor="radioCard"><CgMenuGridR />
                </label>

                <input type="checkbox" name="view" value="list" id="radioList" checked={view==="list"} onChange={handleChangeView}/>
                <label className="labelForChecked" htmlFor="radioList"><SlList />

                </label>
            </div>
        </div>
    );
};

export default ListCollection;