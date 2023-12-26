import React, {useEffect, useState} from 'react';
import {filters} from "../../utils/filters";
import DefaultList from "../../assets/images/defaultList.svg";
import './create.scss';
import axiosSpring from "../../utils/axios/axiosSpring";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import SetViewOnClick from "../MapControls/SetViewOnClick";
import axios from "axios";
import {INVALID_CHARS, NOMINATIM_BASE_URL} from "../../utils/consts";

const PlaceCreateForm = (props) => {
  const [image, setImage] = useState(DefaultList);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState(null);
  const [address, setAddress] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [results, setResults] = useState([]);


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        if(latitude === null && longitude === null){
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        }
      });
    }

    if(props.isUpdate){
      // TODO : check
      // Getting the infos
      axiosSpring.get('/api/places/'+props.placeID)
        .then((response) => {
          setName(response.data.name);
          setCategory(response.data.category);
          setDescription(response.data.description);
          setLatitude(response.data.latitude);
          setLongitude(response.data.longitude);
        })
        .catch((error) => console.log("error", error));

      // Getting the image
      axiosSpring.get('/api/place/image',{
        params: {
          placeID: props.placeID,
        }
      })
        .then((response) => {
          setImage(response.data.image);
        })
        .catch((error) => console.log("error", error));
    }
  }, [latitude, longitude]);

  const handleSearch = (query) => {
    const params = {
      q: query,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    axios.get(NOMINATIM_BASE_URL+queryString)
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => console.log("error", error));
  }

  const handleSubmit = async () => {
    // Check if not empty
    if (name == null || name === '' || name === undefined) {
      setNameError('Le nom du lieu est obligatoire');
      return;
    }

    // Check if good size
    if (name.length < 4 || name.length > 32) {
      setNameError(
        'Le nom du lieu doit contenir entre 4 et 32 caractères'
      );
      return;
    }

    // Check location
    if (latitude === null || longitude === null) {
      setAddressError('Veuillez sélectionner une adresse');
      return;
    }

    // Check if no invalid caracters
    for (let i = 0; i < INVALID_CHARS.length; i++) {
      if (name.includes(INVALID_CHARS[i])) {
        setNameError(
          'Le nom du lieu ne doit pas contenir de caractères spéciaux (sauf - et _)'
        );
        return;
      }
    }

    setNameError(null);


    if(props.isUpdate){
      const response = await axiosSpring.put('/api/places/update', {
        id: props.placeID,
        name: name,
        category: category,
        description: description,
        latitude: latitude,
        longitude: longitude,
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });

      axiosSpring.post('/api/place/image', {
        placeID: props.placeID,
        image: image,
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    }else{
      const response = await axiosSpring.post('/api/places/create', {
        ownerID: 1, // TODO
        name: name,
        category: category,
        description: description,
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      }); // TODO : make return place ID

      axiosSpring.post('/api/place/image', {
        placeID: 1, // TODO
        image: image,
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    }
  };

  return (
    <section className="placeCreate">
      <article className="placeCreate__image">
        <h1># Image du lieu</h1>
        <div className="placeCreate__image__content">
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
            setImage(e.target.files[0])
          }}></input>
        </div>
      </article>

      <article className="placeCreate__location">
        <h1># Localisation du lieu</h1>
        <MapContainer
          className='placeCreate__location__map'
          zoom={3}
          center={
              latitude !== null && longitude !== null ?
              [latitude, longitude] : [0, 0]
          }
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {
            latitude !== null && longitude !== null ?

              <SetViewOnClick center={[latitude, longitude]} zoom={11} class="placeCreate__location__map"/> : null
          }

          {
            latitude !== null && longitude !== null ?
              <Marker
                position={
                  [latitude, longitude]
                }
              /> : null
          }
        </MapContainer>

        <div className="placeCreate__location__form">
          <label htmlFor='address'>Adresse</label>
          <input type="text" placeholder='Adresse' name='address' value={address === null ? "" : address} onChange={(e) => {
            setAddress(e.target.value);
            handleSearch(e.target.value);
          }}></input>
          {
            addressError !== null ? <p className="placeCreate__location__form__error">{addressError}</p> : null
          }
          {
            results.length > 0 ?
              <ul className="placeCreate__location__form__results">
                {
                  results.map((result) => {
                    return <li onClick={() => {
                      setAddress(result.display_name);
                      setLatitude(result.lat);
                      setLongitude(result.lon);
                    }}
                      key={result.place_id}
                    >{result.display_name}</li>
                  })
                }
              </ul>
              : null
          }
        </div>
      </article>

      <article className="placeCreate__infos">
        <h1># Informations sur le lieu</h1>
        <div className="placeCreate__infos__form">
          <label htmlFor='name'>Nom du lieu</label>
          <input type="text" placeholder='Nom du lieu' value={name} id='name' name='name' onChange={(e) => setName(e.target.value)}></input>
          {
            nameError !== null ? <p className="placeCreate__infos__form__error">{nameError}</p> : null
          }
          <label htmlFor='category'>Catégorie <span>Défaut : Autre</span></label>
          <select id='category' name='category' defaultValue={filters[filters.length-1].name} onChange={(e) => setCategory(e.target.value)}>
            {
              filters.map((filter, index) => {
                return <option key={index} value={filter.name} >{filter.name}</option>
              })
            }
          </select>
          <label htmlFor='description'>Description <span>Tips : optionnelle</span></label>
          <textarea id='description' value={description} placeholder='Ce lieu est génial car...' name='description' onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
      </article>
      <button className="placeCreate__submit" onClick={handleSubmit}>{
        props.isUpdate ? 'Modifier le lieu' : 'Créer le lieu'
      }</button>
    </section>
  );
};

// TODO : image preview

export default PlaceCreateForm;