import {
  IoBalloonOutline,
  IoCarOutline,
  IoFastFoodOutline,
  IoFilmOutline,
  IoLibraryOutline,
  IoRestaurantOutline
} from "react-icons/io5";
import {AiOutlineAppstore, AiOutlinePicture} from "react-icons/ai";
import {PiBooks, PiChampagne, PiPark, PiTrain} from "react-icons/pi";
import {RiParkingBoxLine, RiShoppingBagLine} from "react-icons/ri";
import {
  MdHealing,
  MdOutlineCasino,
  MdOutlineCastle,
  MdOutlineLocalHotel,
  MdOutlineTempleBuddhist,
  MdOutlineWorkOutline
} from "react-icons/md";
import {LuCarrot, LuFerrisWheel} from "react-icons/lu";
import {CiBeerMugFull, CiDumbbell, CiShop} from "react-icons/ci";
import {FaKiwiBird, FaTheaterMasks} from "react-icons/fa";
import {GiGreekTemple} from "react-icons/gi";
import {BsCupHot} from "react-icons/bs";

export const icons = [
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
];

export const filters = [
  {
    id: 'FOOD',
    name: 'Food',
    icon: <IoFastFoodOutline />
  },
  {
    id: 'RESTAURANT',
    name: 'Restaurant',
    icon: <IoRestaurantOutline />
  },
  {
    id: 'BAR',
    name: 'Bar',
    icon: <CiBeerMugFull />
  },
  {
    id: 'CAFE',
    name: 'Café',
    icon: <BsCupHot />
  },


  {
    id: 'ENTERTAINMENT',
    name: 'Divertissement',
    icon: <IoBalloonOutline />
  },
  {
    id: 'CULTURE',
    name: 'Culture',
    icon: <PiBooks />
  },
  {
    id: 'PARK',
    name: 'Parc',
    icon: <PiPark />
  },
  {
    id: 'AMUSEMENT_PARK',
    name: 'Attractions',
    icon: <LuFerrisWheel />
  },
  {
    id: 'SPORT',
    name: 'Sport',
    icon: <CiDumbbell />
  },
  {
    id: 'CINEMA',
    name: 'Cinéma',
    icon: <IoFilmOutline />
  },
  {
    id: 'THEATRE',
    name: 'Théâtre',
    icon: <FaTheaterMasks />
  },
  {
    id: 'MUSEUM',
    name: 'Musée',
    icon: <AiOutlinePicture />
  },
  {
    id: 'MONUMENT',
    name: 'Monument',
    icon: <GiGreekTemple />
  },
  {
    id: 'RELIGIOUS_SITE',
    name: 'Site religieux',
    icon: <MdOutlineTempleBuddhist />
  },
  {
    id: 'HISTORICAL_SITE',
    name: 'Site historique',
    icon: <MdOutlineCastle />
  },
  {
    id: 'ZOO',
    name: 'Zoo',
    icon: <FaKiwiBird />
  },
  {
    id: 'CASINO',
    name: 'Casino',
    icon: <MdOutlineCasino />
  },
  {
    id: 'NIGHTCLUB',
    name: 'Club',
    icon: <PiChampagne />
  },
  {
    id: 'LIBRARY',
    name: 'Bibliothèque',
    icon: <IoLibraryOutline />
  },



  {
    id: 'SHOP',
    name: 'Magasin',
    icon: <CiShop />
  },
  {
    id: 'MALL',
    name: 'Centre commerciale',
    icon: <RiShoppingBagLine />
  },
  {
    id: 'MARKET',
    name: 'Marché',
    icon: <LuCarrot />
  },
  {
    id: 'HOTEL',
    name: 'Hôtel',
    icon: <MdOutlineLocalHotel />
  },
  {
    id: 'GAZ_STATION',
    name: 'Station service',
    icon: <IoCarOutline />
  },
  {
    id: 'HEALTH',
    name: 'Santé',
    icon: <MdHealing />
  },
  {
    id: 'WORK',
    name: 'Travail',
    icon: <MdOutlineWorkOutline />
  },
  {
    id: 'PARKING',
    name: 'Parking',
    icon: <RiParkingBoxLine />
  },
  {
    id: 'PUBLIC_TRANSPORT',
    name: 'Transport',
    icon: <PiTrain />
  },
  {
    id: 'OTHER',
    name: 'Autre',
    icon: <AiOutlineAppstore />
  }
]