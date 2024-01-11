import ExampleList from "./components/ExampleList";
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
import SharePosition from "./components/position/SharePosition";

function App() {
  return (
    <div className="app">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/lists" element={<ListsPage />} />
          <Route path="/example" element={<ExampleList />} />
          <Route path="/profil" element={<Profile />} />

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

          {/* position */}
          <Route path="/share-position" element={<SharePosition />} />

          {/* Errors */}
          <Route path="*" element={<NotFound/>} />
        </Routes>
        <Alert/>
      </Router>
    </div>
  );
}

export default App;
