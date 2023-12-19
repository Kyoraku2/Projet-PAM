import React, {useState} from 'react';
import DefaultListIcone from '../../assets/images/defaultList.svg';

const ListPreview = (props) => {

    const [name, setName] = useState("Name");
    const [image, setImage] = useState(DefaultListIcone);

    return (
        <a href={'/'} className={props.class+'__listPreview'}> {/* TODO add link */}

            <img src={image} alt="Default list icon"/>
            <p>{name}</p>

        </a>
    );
};

export default ListPreview;