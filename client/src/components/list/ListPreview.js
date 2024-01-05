import React, {useContext, useEffect, useState} from 'react';
import DefaultListIcone from '../../assets/images/defaultList.svg';
import AlertContext from '../context/alerts/AlertContext';
import { ALERT_TYPES } from '../context/alerts/Alert';
import axiosSpring from '../../utils/axios/axiosSpring';

const ListPreview = (props) => {
    const {setAlert} = useContext(AlertContext);
    const [name, setName] = useState("<No Data>");
    const [image, setImage] = useState(DefaultListIcone);

    useEffect(() => {
        if(props.id !== undefined) {
            axiosSpring.get('/api/lists/'+props.id)
                .then((response) => {
                    if(response.status === 200) {
                        setName(response.data.name);
                        axiosSpring.get('/api/list/'+props.id+'/image', {
                            responseType: 'arraybuffer'
                        }).then(
                            response => {
                                if(response.status === 200) {
                                    const blob = new Blob([response.data], {type: 'image/png'});
                                    setImage(URL.createObjectURL(blob));
                                }
                                if(response.status === 204) {
                                    setImage(DefaultListIcone);
                                }
                            }
                        ).catch(
                            error => {
                                console.log(error);
                            }
                        )
                    }else{
                        setAlert({
                            type: ALERT_TYPES.ERROR.type,
                            message: 'Erreur lors de la récupération de la liste',
                            icon: ALERT_TYPES.ERROR.icon
                        });
                    }
                })
        }
    }, [props.id, setAlert]);

    return (
        <a href={'/lists/'+props.id} className={props.class+'__listPreview'}>

            <img src={image} alt="Default list icon"/>
            <p>{name}</p>

        </a>
    );
};

export default ListPreview;