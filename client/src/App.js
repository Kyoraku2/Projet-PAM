import ExampleList from "./components/ExampleList";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./components/home/Home";
import NotFound from "./components/errors/NotFound";
import './base.scss';
import ListCollection from "./components/list/ListCollection";
import ListsPage from "./components/list/ListsPage";
import Place from "./components/place/Place";

function App() {

  return (
    <div className="app">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/example" element={<ExampleList />} />/>
          <Route path="/lists" element={<ListsPage />} />/>
          <Route path="/place" element={<Place/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        {/*<Footer/> TODO : display correclty*/}
      </Router>
    </div>
  );
}

export default App;
