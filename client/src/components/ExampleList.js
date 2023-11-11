import React, {useEffect, useState} from 'react';
import axiosSpring from "./axios/axiosSpring";
import ExampleItem from "./ExampleItem";

const ExampleList = (props) => {
  const [exampleList, setExampleList] = useState([]);

  useEffect(() => {
    axiosSpring.get("/api/example/entity?id=14").then(
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
  }, [setExampleList]);


  return (
    <ul>
      {exampleList.map((example, index) => {
        return <ExampleItem key={index} description={example.description} name={example.name}/>;
      })}
    </ul>
  );
};

export default ExampleList;