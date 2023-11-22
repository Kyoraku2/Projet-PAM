import React, {useEffect, useState} from 'react';
import {IoChevronBackCircleOutline, IoChevronForwardCircleOutline} from "react-icons/io5";
import SimpleFilter from "./SimpleFilter";
import RadiusFilter from "./RadiusFilter";

const FilterList = (props) => {
  const className = props.class !== undefined ? props.class+'__filters' : '__filters';
  const [activeFilter, setActiveFilter] = useState(undefined);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [subMenuDisplayed, setSubMenuDisplayed] = useState(false);
  const [maxScroll, setMaxScroll] = useState(0);
  const [listWidth, setListWidth] = useState(0);

  const radiusOptions = [1, 5, 10, 20, 30, 50, 100];
  const [selectedRadius, setSelectedRadius] = useState(radiusOptions[0]);

  const spaceBeforeShowingArrow = 30;
  const scrollStep = 200;

  useEffect(() => {
    const element = document.querySelector('.'+className+'__list');
    setScrollPosition(element.scrollLeft);
    setMaxScroll(element.scrollWidth);
    setListWidth(element.offsetWidth);
  }, [props.filters]);

  const handleRadius = (radius) => {
    setSelectedRadius(radius);
  }

  const handleActiveFilter = (event) => {
    if(event.target.value !== activeFilter){
      setActiveFilter(event.target.value);
    }else{
      setActiveFilter(undefined);
    }
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
    if(filter.id === subMenuDisplayed?.id){
      setSubMenuDisplayed(false);
    }else{
      setSubMenuDisplayed(filter);
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
        <RadiusFilter index={-1} className={className} activeFilter={activeFilter} handleActiveFilter={handleActiveFilter} handleSubMenu={handleSubMenu}/>
        {props.filters.map((filter, index) => {
          return <SimpleFilter key={index} index={index} className={className} filter={filter} activeFilter={activeFilter} handleActiveFilter={handleActiveFilter} handleSubMenu={handleSubMenu}/>
        })}
      </ul>
      {
        subMenuDisplayed !== false?
          (
            subMenuDisplayed.id === 'radius'? // TODO : think about mobile version
              (
                <div className={className+'__subMenu'+ ' radiusSubMenu'}>
                  <span className='radiusSubMenu__title'>Dans un rayon de</span>
                  <div className='radiusSubMenu__options'>
                    {
                      radiusOptions.map((radius, index) => {
                        return <button key={index} className={'radiusSubMenu__options__item' + (selectedRadius===radius?' radiusSubMenu__options__item--active':'')} onClick={() => handleRadius(radius)}>{radius}km</button>
                      })
                    }
                  </div>
                </div>
              ):null
          )
          :null
      }
    </div>
  );
};

export default FilterList;