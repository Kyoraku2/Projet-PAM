import MainMap from "./MainMap";
import FilterList from "./FilterList";
import './homePage.scss';
import './radiusSubMenu.scss';
import {filters} from "../../utils/filters";

const Home = (props) => {
  return <section className='home'>
    <FilterList class={'home'} filters={filters}/>
    <MainMap class={'home'} />

  </section>
};

export default Home;