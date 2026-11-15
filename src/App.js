//IMPORT
import Header from './components/include/Header';
import Footer from './components/include/Footer'; 
import Home from './components/Home';
import AdvancedJS from "./components/AdvancedJS";
import { HashRouter, Routes, Route } from "react-router-dom";
import Bookings from './components/Bookings';
import FAQ from './components/FAQ';
//UI
function App() {
  return (
    <HashRouter>  {/* <--- MUST BE HashRouter */}
      <div style={{ overflowX: "hidden" }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/advancedjs" element={<AdvancedJS />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}
export default App;