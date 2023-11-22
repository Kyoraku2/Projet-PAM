import MainMap from "./MainMap";
import FilterList from "./FilterList";
import './homePage.scss'
import  './radiusSubMenu.scss'
import {IoRestaurantOutline} from "react-icons/io5";

const filters = [
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon:<IoRestaurantOutline />
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

const icons = [
  <IoFastFoodOutline />,
  <IoRestaurantOutline />,
  <CiBeerMugFull />,
  <BsCupHot />,
  <IoBalloonOutline />,
  <PiBooks />,
  <PiPark />,
  <LuFerrisWheel />,
  <CiDumbbell />,
  <IoFilmOutline />,
  <FaTheaterMasks />,
  <AiOutlinePicture />,
  <GiGreekTemple />,
  <MdOutlineTempleBuddhist />,
  <MdOutlineCastle />,
  <FaKiwiBird />,
  <MdOutlineCasino />,
  <PiChampagne />,
  <IoLibraryOutline />,
  <CiShop />,
  <RiShoppingBagLine />,
  <LuCarrot />,
  <MdOutlineLocalHotel />,
  <IoCarOutline />,
  <MdHealing />,
  <MdOutlineWorkOutline />,
  <RiParkingBoxLine />,
  <PiTrain />,
  <AiOutlineAppstore />
]

const Home = (props) => {
  return <section className='home'>
    <FilterList class={'home'} filters={filters}/>
    <MainMap class={'home'} />

  </section>
};

export default Home;