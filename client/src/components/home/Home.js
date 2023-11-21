import MainMap from "./MainMap";
import FilterList from "./FilterList";
import './homePage.scss'
import {IoRestaurantOutline} from "react-icons/io5";

const filters = [
  {
    id: 'restaurant',
    name: 'Restaurant',
    expandable:true,
    icon:<IoRestaurantOutline />,
    onClick:()=>{console.log('click')}
  },{
    id: 'prout',
    name: 'Prout',
    expandable:true
  },{
    id: 'restaurant',
    name: 'Restaurant'
  },{
    id: 'restaurant',
    name: 'Restaurant'
  },{
    id: 'restaurant',
    name: 'Restaurant'
  },{
    id: 'restaurant',
    name: 'Restaurant'
  },{
    id: 'restaurant',
    name: 'Restaurant'
  },
  {
    id: 'bar',
    name: 'Bar'
  },
  {
    id: 'cafe',
    name: 'Cafe'
  }
]

const Home = (props) => {
  return <section className='home'>
    <FilterList class={'home'} filters={filters}/>
    <MainMap class={'home'} />
  </section>
};

export default Home;