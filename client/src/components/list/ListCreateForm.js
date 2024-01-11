import React, {useContext, useEffect, useState} from 'react';
import DefaultList from "../../assets/images/defaultList.svg";
import {INVALID_CHARS} from "../../utils/consts";
import axiosSpring from "../../utils/axios/axiosSpring";
import './create.scss';
import AlertContext from "../context/alerts/AlertContext";
import {ALERT_TYPES} from "../context/alerts/Alert";
import {useNavigate, useParams} from 'react-router-dom';

const ListCreateForm = (props) => {
  const {setAlert} = useContext(AlertContext);

  const {listID} = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(DefaultList);
  const [imagePreview, setImagePreview] = useState(DefaultList);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState(null);

  const handleImageChange = (file) => {
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const resetAndRedirect = (id) => {
    setName("");
    setDescription("");
    setImage(DefaultList);
    setImagePreview(DefaultList);
    navigate('/lists/'+id);
  }

  useEffect(() => {
    if(props.isUpdate && name === "") {
      // Getting the infos
      axiosSpring.get('/api/lists/' + listID)
        .then((response) => {
          if(response.status === 200) {
            setName(response.data.name);
            setDescription(response.data.description);

            axiosSpring.get("/api/list/"+listID+"/image",{
              responseType: 'arraybuffer',
            }).then(
              response => {
                if(response.status === 200){
                  // Create a blob from the image
                  const blob = new Blob([response.data], {type: 'image/png'});
                  // Set the data URL to display the image
                  handleImageChange(blob);
                }
              }
            ).catch(
              error => {
                console.log(error);
              }
            )

            setAlert({
              type: ALERT_TYPES.SUCCESS.type,
              message: 'Liste récupérée avec succès',
              icon: ALERT_TYPES.SUCCESS.icon
            });
          }else{
            setAlert({
              type: ALERT_TYPES.ERROR.type,
              message: 'Erreur lors de la récupération de la liste',
              icon: ALERT_TYPES.ERROR.icon
            });
          }
        })
        .catch((error) => {
          console.log(error);
          setAlert({
            type: ALERT_TYPES.ERROR.type,
            message: 'Erreur lors de la création de la liste',
            icon: ALERT_TYPES.ERROR.icon
          });
        });
    }
  }, [props, listID, setAlert, name]);


  const handleSubmit = async () => {
    // Check if not empty
    if (name == null || name === '' || name === undefined) {
      setNameError('Le nom de la liste est obligatoire');
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

    if (props.isUpdate) {
      let formData = new FormData();
      formData.append('image', image);
      formData.append('list', JSON.stringify({
        id: listID,
        name: name,
        description: description,
        ownerID: 1, // TODO ownerID
        isShared: false,
      }));

      await axiosSpring.put('/api/lists/'+listID, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
        if(response.status === 200) {
          setAlert({
            type: ALERT_TYPES.SUCCESS.type,
            message: 'Liste modifiée avec succès',
            icon: ALERT_TYPES.SUCCESS.icon
          });
          resetAndRedirect(response.data.id);
        }else{
          setAlert({
            type: ALERT_TYPES.ERROR.type,
            message: 'Erreur lors de la modification de la liste',
            icon: ALERT_TYPES.ERROR.icon
          });
        }
      }).catch((error) => {
        console.log(error);
        setAlert({
          type: ALERT_TYPES.ERROR.type,
          message: 'Erreur lors de la création de la liste',
          icon: ALERT_TYPES.ERROR.icon
        });
      });
    } else {
      let formData = new FormData();
      formData.append('image', image);
      formData.append('list', JSON.stringify({
        name: name,
        description: description,
        ownerID: 1, // TODO ownerID
        isShared: false,
      }));

      await axiosSpring.post('/api/lists', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        if(response.status === 200) {
          setAlert({
            type: ALERT_TYPES.SUCCESS.type,
            message: 'Liste créée avec succès',
            icon: ALERT_TYPES.SUCCESS.icon
          });
          resetAndRedirect(response.data.id);
        }else{
          setAlert({
            type: ALERT_TYPES.ERROR.type,
            message: 'Erreur lors de la création de la liste',
            icon: ALERT_TYPES.ERROR.icon
          });
        }
      }).catch((error) => {
        console.log(error);
        setAlert({
          type: ALERT_TYPES.ERROR.type,
          message: 'Erreur lors de la création de la liste',
          icon: ALERT_TYPES.ERROR.icon
        });
      });
    }
  }

  return (
    <section className="listCreate">
      <article className="listCreate__image">
        <h1># Image de la liste</h1>
        <div className="listCreate__image__content">
          <label htmlFor='list_image'>
            <img src={imagePreview} alt='list'/>
            <div>
              <h2>Choisir une image...</h2>
              <p>Une image carrée serait parfait ;)</p>
              <p>Taille maximum : 5mb</p>
              <p>(Image optionnelle)</p>
            </div>
          </label>
          <input type="file" id='list_image' name='list_image' onChange={(e) => {
            handleImageChange(e.target.files[0]);
          }}></input>
        </div>
      </article>

      <article className="listCreate__infos">
        <h1># Informations sur la liste</h1>
        <div className="listCreate__infos__form">
          <label htmlFor='name'>Nom de la liste</label>
          <input type="text" placeholder='Nom de la liste' value={name} id='name' name='name' onChange={(e) => setName(e.target.value)}></input>
          {
            nameError !== null ? <p className="listCreate__infos__form__error">{nameError}</p> : null
          }
          <label htmlFor='description'>Description <span>Tips : optionnelle</span></label>
          <textarea id='description' value={description} placeholder='Cette liste contient...' name='description' onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
      </article>
      <button className="listCreate__submit" onClick={handleSubmit}>{
        props.isUpdate ? 'Modifier la liste' : 'Créer la liste'
      }</button>
    </section>
  );
};

export default ListCreateForm;