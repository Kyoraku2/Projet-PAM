import React from 'react';

const SimpleFilter = (props) => {
  return (
    <li key={props.index} className={props.className+'__list__item'}>
      <input type='checkbox' id={props.filter.id} name={props.filter.id} value={props.filter.id} onChange={props.handleActiveFilter} checked={props.filter.id === props.activeFilter}/>
      <label htmlFor={props.filter.id} className={props.activeFilter===props.filter.id?'activeFilter':''}>
        {
          props.filter.icon !== undefined ?
            <span data-icon='true'>{props.filter.icon}</span>
            :null
        }
        {props.filter.name}
      </label>
    </li>
  );
};

export default SimpleFilter;