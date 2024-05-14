import "./App.css";
import {Route, Routes} from "react-router-dom";
import SignIn from "./pages/SignIn";
import axios from "axios";
import Shop from "./pages/Shop";
import Register from "./pages/Register";
import {useEffect} from "react";
import Checkout from "./pages/Checkout";
import "react-toastify/dist/ReactToastify.css";

function App() {
  axios.defaults.baseURL = "http://localhost:8080";
  axios.defaults.withCredentials = true;

  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        {/* <Route path="/dashboard" element={<Home />} /> */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
