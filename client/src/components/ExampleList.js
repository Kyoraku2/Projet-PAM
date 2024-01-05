import React, {useContext, useEffect, useState} from 'react';
import axiosSpring from "../utils/axios/axiosSpring";
import ExampleItem from "./ExampleItem";
import AlertContext from "./context/alerts/AlertContext";
import {ALERT_TYPES} from "./context/alerts/Alert";

const ExampleList = (props) => {
  const [exampleList, setExampleList] = useState([]);
  const {setAlert} = useContext(AlertContext);
  //const [image, setImage] = useState(null);

  const showAlert = () => {
    setAlert({
      type: ALERT_TYPES.ERROR.type,
      text: 'Example list loaded',
      icon: ALERT_TYPES.ERROR.icon
    });
  }

  useEffect(() => {
    axiosSpring.get("/api/example/entities").then(
      response => {
        if(response.status === 200){
          setExampleList(response.data);
        }
      }
    ).catch(
      error => {
        console.log(error);
      }
    )

    /*axiosSpring.get("/api/place/image?placeID="+1,{
      responseType: 'arraybuffer',
    }).then(
      response => {
        if(response.status === 200){
          // Create a blob from the image
          const blob = new Blob([response.data], {type: 'image/png'});
          // Create a data URL from the blob
          const dataUrl = URL.createObjectURL(blob);
          // Set the data URL to display the image
          setImage(dataUrl);
        }
      }
    ).catch(
      error => {
        console.log(error);
      }
    )*/
  }, [setExampleList]);


  return (
    <>
      {/*
        image !== null &&
        <img src={image} alt="Default" />
      */}
      <button onClick={showAlert}>Show alert</button>
      <ul>
        {exampleList.map((example, index) => {
          return <ExampleItem key={index} description={example.description} name={example.name}/>;
        })}
      </ul>
    </>
  );
};

export default ExampleList;