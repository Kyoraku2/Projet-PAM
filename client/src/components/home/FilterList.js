import React, {useEffect, useState} from 'react';
import {IoChevronBackCircleOutline, IoChevronForwardCircleOutline} from "react-icons/io5";
import SimpleFilter from "./SimpleFilter";
import RadiusFilter from "./RadiusFilter";
import {radiusOptions} from "./Home";

const FilterList = (props) => {
  const MEDIA_QUERY = 600;
  const [isMobile, setIsMobile] = useState(false);

  const className = props.class !== undefined ? props.class+'__filters' : '__filters';

  const [scrollPosition, setScrollPosition] = useState(0);

  const [subMenuDisplayed, setSubMenuDisplayed] = useState(false);
  const [maxScroll, setMaxScroll] = useState(0);
  const [listWidth, setListWidth] = useState(0);

  const spaceBeforeShowingArrow = 30;
  const [scrollStep, setScrollStep] = useState(window.innerWidth-100);

  useEffect(() => {
    const element = document.querySelector('.'+className+'__list');
    setScrollPosition(element.scrollLeft);
    setMaxScroll(element.scrollWidth);
    setListWidth(element.offsetWidth);
    const handleResize = () => {
      const element = document.querySelector('.'+className+'__list');
      setScrollStep(window.innerWidth-100);
      setScrollPosition(element.scrollLeft);
      setMaxScroll(element.scrollWidth);
      setListWidth(element.offsetWidth);
      setIsMobile(window.innerWidth <= MEDIA_QUERY);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [props, className]);

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
        <RadiusFilter index={-1} className={className} activeFilter={props.activeFilter} handleActiveFilter={props.handleActiveFilter} handleSubMenu={handleSubMenu}/>
        {props.filters.map((filter, index) => {
          return <SimpleFilter key={index} index={index} className={className} filter={filter} activeFilter={props.activeFilter} handleActiveFilter={props.handleActiveFilter} handleSubMenu={handleSubMenu}/>
        })}
      </ul>
      {
        subMenuDisplayed !== false?
          (
            subMenuDisplayed.id === 'radius'?
              (
                isMobile ? (
                  <div className={className+'__subMenu radiusSubMenu'}>
                    <span className='radiusSubMenu__title'>Dans un rayon de</span>
                    <label htmlFor='radius' className='radiusSubMenu__label'>{props.selectedRadius}km</label>
                    <input type='range' id='radius' className='radiusSubMenu__slider' min={0} max={radiusOptions.length-1} value={props.selectedRadiusID} step={1} onChange={props.handleSlideRadius}/>
                  </div>
                )
                :
                (
                  <div className={className+'__subMenu radiusSubMenu'}>
                    <span className='radiusSubMenu__title'>Dans un rayon de</span>
                    <div className='radiusSubMenu__options'>
                      {
                        radiusOptions.map((radius, index) => {
                          return <button key={index} className={'radiusSubMenu__options__item' + (props.selectedRadius===radius?' radiusSubMenu__options__item--active':'')} onClick={() => props.handleRadius(radius)}>{radius}km</button>
                        })
                      }
                    </div>
                  </div>
                )
              ):null
          )
          :null
      }
    </div>
  );
};

export default FilterList;