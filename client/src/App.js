import ExampleList from "./components/ExampleList";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./components/home/Home";
import NotFound from "./components/errors/NotFound";
import Profile from "./components/profile/Profile";
import './base.scss';
import ListCollection from "./components/list/ListCollection";
import ListsPage from "./components/list/ListsPage";

function App() {

  return (
    <div className="app">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/example" element={<ExampleList />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/lists" element={<ListsPage />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        {/*<Footer/> TODO : display correclty*/}
      </Router>
    </div>
  );
}

export default App;
