import "./App.css";
import {Route, Routes} from "react-router-dom";
import SignIn from "./pages/SignIn";
import axios from "axios";
import Home from "./pages/Home";
import Shop from "./pages/Shop";

function App() {
  axios.defaults.baseURL = "http://localhost:8080";
  axios.defaults.withCredentials = true;

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />        
        <Route path="/dashboard" element={<Home/>}/>
        <Route path="/shop" element={<Shop/>}/>
      </Routes>
    </>
  );
}

export default App;
