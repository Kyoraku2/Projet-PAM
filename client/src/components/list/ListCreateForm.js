import React, {useEffect, useState} from 'react';
import DefaultList from "../../assets/images/defaultList.svg";
import {INVALID_CHARS} from "../../utils/consts";
import axiosSpring from "../../utils/axios/axiosSpring";
import './create.scss';

const ListCreateForm = (props) => {
  const [image, setImage] = useState(DefaultList);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState(null);

  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const [places, setPlaces] = useState([{
    id: 1,
    name: 'test test test ',
  }, {
    id: 2,
    name: 'test2',
  },
    {
      id: 3,
      name: 'test3',
    }]);

  useEffect(() => {
    if(props.isUpdate){
      // TODO : check
      // Getting the infos
      axiosSpring.get('/api/lists/details', { // TODO : add to backend the fact that it returns the places
        params: {
          id: props.listID,
        }
      })
        .then((response) => {
          setName(response.data.name);
          setDescription(response.data.description);
          setPlaces(response.data.places)
        })
        .catch((error) => console.log("error", error));

      // Getting the image
      axiosSpring.get('/api/list/image',{
        params: {
          listID: props.listID,
        }
      })
        .then((response) => {
          setImage(response.data.image);
        })
        .catch((error) => console.log("error", error));
    }

  }, []);

  const handleSubmit = () => {
    // Check if not empty
    if (name == null || name === '' || name === undefined) {
      setNameError('Le nom du lieu est obligatoire');
      return;
    }

    // Check if good size
    if (name.length < 4 || name.length > 32) {
      setNameError(
        'Le nom de la liste doit contenir entre 4 et 32 caractères'
      );
      return;
    }

    // Check if no invalid caracters
    for (let i = 0; i < INVALID_CHARS.length; i++) {
      if (name.includes(INVALID_CHARS[i])) {
        setNameError(
          'Le nom de la liste ne doit pas contenir de caractères spéciaux (sauf - et _)'
        );
        return;
      }
    }

    setNameError(null);

    // TODO : check
    if(props.isUpdate){
      const response = axiosSpring.put('/api/lists/update', {
        id: props.listID,
        name: name,
        description: description,
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      }); // TODO : make return list ID

      axiosSpring.post('/api/list/image', {
        listID: props.listID,
        image: image,
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    }else{
      const response = axiosSpring.post('/api/lists/create', {
        ownerID: 1, // TODO
        name: name,
        description: description,
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      }); // TODO : make return list ID

      axiosSpring.post('/api/list/image', {
        listID: 1, // TODO
        image: image,
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  const handlePlaceChange = (id) => {
    if(selectedPlaces.includes(id) === false){
      setSelectedPlaces([...selectedPlaces, id]);
    }else{
      setSelectedPlaces(selectedPlaces.filter((place) => place !== id));
    }
  }

  return (
    <section className="listCreate">
      <article className="listCreate__image">
        <h1># Image de la liste</h1>
        <div className="listCreate__image__content">
          <label htmlFor='place_image'>
            <img src={image === DefaultList ? image : URL.createObjectURL(image)} alt='default place'/>
            <div>
              <h2>Choisir une image...</h2>
              <p>Une image carrée serait parfait ;)</p>
              <p>Taille maximum : 5mb</p>
              <p>(Image optionnelle)</p>
            </div>
          </label>
          <input type="file" id='place_image' name='place_image' onChange={(e) => {
            setImage(e.target.files[0]);
          }}></input>
        </div>
      </article>

      <article className="listCreate__places">
        <h1># Lieux de la liste</h1>
        <ul className="listCreate__places__content">
          {
            places.map((place) => {
              return(
                <li key={place.id} onClick={() => handlePlaceChange(place.id)} className={"listCreate__places__content__item " + (selectedPlaces.includes(place.id)?" selected":"")}>
                  <h2>{place.name}</h2>
                </li>
              )
            })
          }
        </ul>
      </article>


      <article className="listCreate__infos">
        <h1># Informations sur le lieu</h1>
        <div className="listCreate__infos__form">
          <label htmlFor='name'>Nom de la liste</label>
          <input type="text" placeholder='Nom de la liste' value={name} id='name' name='name' onChange={(e) => setName(e.target.value)}></input>
          {
            nameError !== null ? <p className="listCreate__infos__form__error">{nameError}</p> : null
          }
          <label htmlFor='description'>Description <span>Tips : optionnelle</span></label>
          <textarea id='description' value={description} placeholder='Ce lieu est génial car...' name='description' onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
      </article>
      <button className="placeCreate__submit" onClick={handleSubmit}>{
        props.isUpdate ? 'Modifier la liste' : 'Créer la liste'
      }</button>
    </section>
  );
};

export default ListCreateForm;