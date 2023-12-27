import './App.css';
import Footer from './components/Layout/Footer';
import Header from "./components/Layout/Header";

import {BrowserRouter as Router} from "react-router-dom";
import AnimatedRoutes from './AnimatedRoutes';


function App() {

  return (
    <Router basename="/">
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <AnimatedRoutes />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
