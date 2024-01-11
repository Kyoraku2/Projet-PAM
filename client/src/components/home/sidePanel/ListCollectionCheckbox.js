import React, {useEffect, useState} from 'react';
import axiosSpring from "../../../utils/axios/axiosSpring";
import ListPreviewCheckbox from "./ListPreviewCheckbox";

const ListCollectionCheckbox = (props) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    axiosSpring.get('/api/lists/user/'+ 1) // TODO: get user id from context
      .then((response) => {
        if(response.status === 200) {
          setLists(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ul className="collectionsCheck">
      {lists.map((list) => {
        return (
          <ListPreviewCheckbox key={list.id} id={list.id} name={list.name} image={list.image} onChange={props.onChange} checkedPlaces={props.checkedPlaces}/>
        );
      })}
    </ul>
  );
};

export default ListCollectionCheckbox;