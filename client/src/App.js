import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./components/home/Home";
import NotFound from "./components/errors/NotFound";
import Profile from "./components/profile/Profile";
import './base.scss';
import ListsPage from "./components/list/ListsPage";
import PlaceDetails from "./components/places/PlaceDetails";
import PlaceCreateForm from "./components/places/PlaceCreateForm";
import ListCreateForm from "./components/list/ListCreateForm";
import Alert from "./components/context/alerts/Alert";
import ListDetails from "./components/list/ListDetails";
import PlacesPage from "./components/places/PlacesPage";
import Connexion from './components/connexion/Connexion';
import Logout from "./components/connexion/Logout";
import Inscription from "./components/inscription/Inscription";
import Unauthorized from "./components/errors/Unauthorized";
import RequireAuth from "./components/connexion/RequireAuth";
import {useContext} from "react";
import AuthContext from "./components/context/AuthContext";
import SharePosition from "./components/position/SharePosition";

function App() {
  const {auth} = useContext(AuthContext);

  return (
    <div className="app">
      <Router>
        {
          auth !== undefined && auth?.accessToken !== undefined
            ? <Header name={auth.username} id={auth.id}/>
            : <></>
        }
        <Routes>
          <Route element={<RequireAuth/>}>
            {/* Others */}
            <Route path="/" element={<Home/>} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/logout" element={<Logout/>} />

            {/* Lists */}
            <Route path="/lists" element={<ListsPage canCreate={true}/>} />
            <Route path="/lists/create" element={<ListCreateForm />} />
            <Route path="/lists/update/:listID" element={<ListCreateForm isUpdate={true}/>} />
            <Route path="/lists/:listID" element={<ListDetails />} />
              
            {/* Places */}
            <Route path="/places" element={<PlacesPage canCreate={true}/>} />
            <Route path="/places/create" element={<PlaceCreateForm />} />
            <Route path="/places/update/:placeID" element={<PlaceCreateForm isUpdate={true}/>} />
            <Route path="/places/:placeID" element={<PlaceDetails/>} />

            {/* Position */}
            <Route path="/share-position" element={<SharePosition />} />
          </Route>

          {/* Authentification */}
          <Route path="/login" element={<Connexion/>} />
          <Route path="/register" element={<Inscription/>} />

          {/* Errors */}
          <Route path="/unauthorized" element={<Unauthorized/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        <Alert/>
      </Router>
    </div>
  );
}

export default App;
