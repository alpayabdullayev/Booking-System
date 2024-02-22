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
import Login from "./pages/login";
import Profile from "./pages/profile";
import Destination from "./pages/destination";
import Listing from "./pages/listing";

import { HashLoader, PuffLoader } from "react-spinners";
import { useEffect, useState } from "react";
import PrivateRoot from "./routes";
import Admin from "./pages/admin";
import UserAdminController from "./components/admin/userAdminController";
import NotFound from "./pages/notFound";
import UpdateUser from "./components/admin/updateUser";
import CreateUsers from "./components/admin/createUsers";
import HotelsAdminController from "./components/admin/hotelsAdminController";
import CreateHotel from "./components/admin/createHotel";
import Register from "./pages/register";
import Verify from "./pages/verify";
import CreateHotelForm from "./components/admin/createHotelAdmin";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <div className="flex justify-center items-center h-[100vh]">
            <HashLoader color="#183ee7" />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/types/:typeId" element={<TypeDetail />} />
              <Route path="/hotels" element={<List />} />
              <Route path="/about" element={<About />} />
              <Route path="/hotelDetail/:id" element={<HotelDetail />} />
              <Route path="/expert" element={<BecomeLocalExpert />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/listing" element={<Listing />} />
              <Route path="/destination" element={<Destination />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/Verified" element={<Verify/>}/>
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />

              <Route
                element={
                  <PrivateRoot roles={["user", "admin", "superAdmin"]} />
                }
              >
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>
            <Route element={<PrivateRoot roles={["admin", "superAdmin"]} />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/users" element={<UserAdminController />} />
              <Route path="/admin/hotel" element={<HotelsAdminController />} />
              <Route path="/admin/users/:id/update" element={<UpdateUser />} />
              <Route path="/admin/users/create" element={<CreateUsers />} />
              <Route path="/admin/hotel/create" element={<CreateHotelForm />} />
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
