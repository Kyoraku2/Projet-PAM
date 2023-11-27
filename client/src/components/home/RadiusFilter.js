import React from 'react';
import {FaChevronDown} from "react-icons/fa";
import {MdOutlineRadar} from "react-icons/md";

const RadiusFilter = (props) => {
  const filter = {
    id: 'radius',
    name: 'Radius',
    icon: <MdOutlineRadar />
  };

  return (
    <li key={props.index} className={props.className+'__list__item'}>
      <input type='checkbox' id={filter.id} name={filter.id} value={filter.id} onChange={props.handleActiveFilter} checked={filter.id === props.activeFilter}/>
      <label htmlFor={filter.id} onClick={() => props.handleSubMenu(filter)} className={props.activeFilter===filter.id?'activeFilter':''}>
        {
          filter.icon !== undefined ?
            <span data-icon='true'>{filter.icon}</span>
            :null
        }
        {filter.name}
        <span><FaChevronDown /></span>
      </label>
    </li>
  );
};

export default RadiusFilter;