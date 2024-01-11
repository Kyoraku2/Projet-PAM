import React, {useContext, useEffect, useState} from 'react';
import axiosSpring from "../../../utils/axios/axiosSpring";
import ListPreviewCheckbox from "./ListPreviewCheckbox";
import AuthContext from "../../context/AuthContext";

const ListCollectionCheckbox = (props) => {
  const {auth} = useContext(AuthContext);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    axiosSpring.get('/api/lists/user/'+ auth.id)
      .then((response) => {
        if(response.status === 200) {
          setLists(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [auth]);

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