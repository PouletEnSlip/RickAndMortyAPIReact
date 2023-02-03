import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Favoris from "./Pages/Favoris";
import Episodes from "./Pages/Episodes";
import Personnages from "./Pages/Personnages";
import Inscription from "./Pages/Inscription";
import Connexion from "./Pages/Connexion";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/favoris" element={<Favoris />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/personnages" element={<Personnages />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;