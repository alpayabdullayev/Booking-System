import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home";
import TypeDetail from "./pages/allType";
import List from "./pages/List";
import HotelDetail from "./pages/hotelDetail";
import About from "./pages/about";
import BecomeLocalExpert from "./pages/becomeLocalExpert";
import FAQ from "./pages/faq";
import Contact from "./pages/contact";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/types/:typeId" element={<TypeDetail />} />
            <Route path="/hotels" element={<List />} />
            <Route path="/about" element={<About />} />
            <Route path="/hotelDetail/:id" element={<HotelDetail />} />
            <Route path="/expert" element={<BecomeLocalExpert />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
