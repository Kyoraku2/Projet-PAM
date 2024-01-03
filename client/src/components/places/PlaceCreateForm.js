import React, {useContext, useEffect, useState} from 'react';
import {filters} from "../../utils/filters";
import DefaultList from "../../assets/images/defaultList.svg";
import './create.scss';
import axiosSpring from "../../utils/axios/axiosSpring";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import SetViewOnClick from "../MapControls/SetViewOnClick";
import axios from "axios";
import {INVALID_CHARS, NOMINATIM_BASE_URL} from "../../utils/consts";
import AlertContext from "../context/alerts/AlertContext";
import {ALERT_TYPES} from "../context/alerts/Alert";

const PlaceCreateForm = (props) => {
  const {alert, setAlert} = useContext(AlertContext);

  const [image, setImage] = useState(DefaultList);
  const [imagePreview, setImagePreview] = useState(DefaultList);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState(null);
  const [address, setAddress] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [results, setResults] = useState([]);

  const handleImageChange = (file) => {
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        if(latitude === null && longitude === null){
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        }
      });
    }

    if(props.isUpdate && name === ""){
      // Getting the infos
      axiosSpring.get('/api/places/'+props.placeID)
        .then((response) => {
          if(response.status === 200) {
            setName(response.data.name);
            setCategory(response.data.category);
            setDescription(response.data.description);
            setLatitude(response.data.latitude);
            setLongitude(response.data.longitude);

            if(image === DefaultList){
              axiosSpring.get("/api/place/image?placeID="+props.placeID,{
                responseType: 'arraybuffer',
              }).then(
                response => {
                  if(response.status === 200){
                    // Create a blob from the image
                    const blob = new Blob([response.data], {type: 'image/png'});
                    // Create a data URL from the blob
                    const dataUrl = URL.createObjectURL(blob);
                    // Set the data URL to display the image
                    handleImageChange(blob);
                  }
                }
              ).catch(
                error => {
                  console.log(error);
                }
              )
            }

            setAlert({
              type: ALERT_TYPES.SUCCESS.type,
              message: 'Lieu récupéré avec succès',
              icon: ALERT_TYPES.SUCCESS.icon
            });
          }else{
            setAlert({
              type: ALERT_TYPES.ERROR.type,
              message: 'Erreur lors de la récupération du lieu',
              icon: ALERT_TYPES.ERROR.icon
            });
          }
        })
        .catch((error) => {
          console.log(error);
          setAlert({
            type: ALERT_TYPES.ERROR.type,
            message: 'Erreur lors de la récupération du lieu',
            icon: ALERT_TYPES.ERROR.icon
          });
        });
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

    if(category === null){
      setCategory(filters[filters.length-1].id);
    }

    setNameError(null);


    if(props.isUpdate){
      let formData = new FormData();
      formData.append('image', image);
      formData.append('place', JSON.stringify({
        id: props.placeID,
        name: name,
        ownerID: 1, // TODO ownerID
        category: category,
        description: description,
        latitude: latitude,
        longitude: longitude,
      }));

      axiosSpring.put('/api/places/'+props.placeID, formData)
        .then((response) => {
          if(response.status === 200) {
            setAlert({
              type: ALERT_TYPES.SUCCESS.type,
              message: 'Lieu modifié avec succès',
              icon: ALERT_TYPES.SUCCESS.icon
            });
          }else{
            setAlert({
              type: ALERT_TYPES.ERROR.type,
              message: 'Erreur lors de la modification du lieu',
              icon: ALERT_TYPES.ERROR.icon
            });
          }
        }).catch((error) => {
          console.log(error);
          setAlert({
            type: ALERT_TYPES.ERROR.type,
            message: 'Erreur lors de la modification du lieu',
            icon: ALERT_TYPES.ERROR.icon
          });
        });
    }else{
      let formData = new FormData();
      formData.append('image', image);
      formData.append('place', JSON.stringify({
        name: name,
        ownerID: 1, // TODO ownerID
        category: category,
        description: description,
        latitude: latitude,
        longitude: longitude,
      }));

      axiosSpring.post('/api/places', formData).then((response) => {
        if(response.status === 200) {
          setAlert({
            type: ALERT_TYPES.SUCCESS.type,
            message: 'Lieu créé avec succès',
            icon: ALERT_TYPES.SUCCESS.icon
          });
        }else{
          setAlert({
            type: ALERT_TYPES.ERROR.type,
            message: 'Erreur lors de la création du lieu',
            icon: ALERT_TYPES.ERROR.icon
          });
        }
      }).catch((error) => {
        console.log(error);
        setAlert({
          type: ALERT_TYPES.ERROR.type,
          message: 'Erreur lors de la création du lieu',
          icon: ALERT_TYPES.ERROR.icon
        });
      });
    }
  };

  return (
    <section className="placeCreate">
      <article className="placeCreate__image">
        <h1># Image du lieu</h1>
        <div className="placeCreate__image__content">
          <label htmlFor='place_image'>
            <img src={imagePreview} alt='place'/>
            <div>
              <h2>Choisir une image...</h2>
              <p>Une image carrée serait parfait ;)</p>
              <p>Taille maximum : 5mb</p>
              <p>(Image optionnelle)</p>
            </div>
          </label>
          <input type="file" id='place_image' name='place_image' onChange={(e) => {
            handleImageChange(e.target.files[0]);
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
                return <option key={index} value={filter.id} >{filter.name}</option>
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

export default PlaceCreateForm;