import React, {useEffect, useState} from 'react';
import DefaultListIcone from "../../../assets/images/defaultList.svg";
import axiosSpring from "../../../utils/axios/axiosSpring";

const ListPreviewCheckbox = (props) => {
  const [image, setImage] = useState(DefaultListIcone);

  useEffect(() => {
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
  }, [setImage, props]);

  return (
    <li className="collectionsCheck__item">
      <input type="checkbox" id={props.id} name={props.id} value={props.id} onChange={props.onChange} checked={props.checkedPlaces.includes(props.id+'')}/>
      <label htmlFor={props.id}>
        <img src={image} alt="Default list icon"/>
        <p>{props.name}</p>
      </label>
    </li>
  );
};

export default ListPreviewCheckbox;