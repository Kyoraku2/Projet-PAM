import MainMap from "./MainMap";
import FilterList from "./FilterList";
import './homePage.scss';
import './radiusSubMenu.scss';
import {filters} from "../../utils/filters";
import SidePanel from "./sidePanel/SidePanel";

const Home = (props) => {
  return <section className='home'>
    <SidePanel class={'home'} />
    <FilterList class={'home'} filters={filters}/>
    <MainMap class={'home'} />

  </section>
};

export default Home;