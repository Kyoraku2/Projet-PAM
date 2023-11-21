import React, {useEffect, useState} from 'react';
import {IoChevronBackCircleOutline, IoChevronForwardCircleOutline} from "react-icons/io5";
import {FaChevronDown} from "react-icons/fa";

const FilterList = (props) => {
  const className = props.class !== undefined ? props.class+'__filters' : '__filters';
  const [activeFilter, setActiveFilter] = useState(props.filters[0].id);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [subMenuDisplayed, setSubMenuDisplayed] = useState(false);
  const [maxScroll, setMaxScroll] = useState(0);
  const [listWidth, setListWidth] = useState(0);

  const spaceBeforeShowingArrow = 30;
  const scrollStep = 200;

  useEffect(() => {
    const element = document.querySelector('.'+className+'__list');
    setScrollPosition(element.scrollLeft);
    setMaxScroll(element.scrollWidth);
    setListWidth(element.offsetWidth);
  }, [props.filters]);

  const handleActiveFilter = (event) => {
    setActiveFilter(event.target.value);
  }

  const handleScroll = (event) => {
    setScrollPosition(event.target.scrollLeft);
    setMaxScroll(event.target.scrollWidth);
  }

  const handleRightArrow = () => {
    document.querySelector('.'+className+'__list').scrollTo({
      top: 0,
      left: scrollPosition+scrollStep,
      behavior: 'smooth'
    });
    console.log(scrollPosition);
    console.log(maxScroll - spaceBeforeShowingArrow - listWidth);
  }

  const handleLeftArrow = () => {
    document.querySelector('.'+className+'__list').scrollTo({
      top: 0,
      left: scrollPosition-scrollStep,
      behavior: 'smooth'
    });
  }

  const handleSubMenu = (filter) => {
    if(filter === subMenuDisplayed){
      setSubMenuDisplayed(false);
    }else{
      if(filter.expandable) {
        setSubMenuDisplayed(filter);
      }
      if(filter.onClick){
        filter.onClick();
      }
    }
  }

  return (
    <div className={className}>
      {
        scrollPosition > spaceBeforeShowingArrow ?
          <IoChevronBackCircleOutline className={className+'__left'} onClick={handleLeftArrow}/>
          :null
      }
      {
        scrollPosition < maxScroll - spaceBeforeShowingArrow - listWidth?
          <IoChevronForwardCircleOutline className={className+'__right'} onClick={handleRightArrow}/>
          :null
      }
      <ul className={className+'__list'} onScroll={handleScroll}>
        {props.filters.map((filter, index) => {
          return <li key={index} className={className+'__list__item'}>
            <input type='radio' id={filter.id} name={filter.id} value={filter.id} onChange={handleActiveFilter} checked={filter.id === activeFilter}/>
            <label htmlFor={filter.id} onClick={() => handleSubMenu(filter)}>
              {
                filter.icon !== undefined ?
                  <span data-icon='true'>{filter.icon}</span>
                  :null
              }
              {filter.name} {
              filter.expandable ?
                <span><FaChevronDown /></span>
                :null
            }</label>
          </li>
        })}
      </ul>
      {
        subMenuDisplayed !== false?
          <ul className={className+'__subMenu'}>
            This is a subMenu ({subMenuDisplayed.name})
          </ul>
          :null
      }
    </div>
  );
};

export default FilterList;