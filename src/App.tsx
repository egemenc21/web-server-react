import "./App.css";
import {Route, Routes} from "react-router-dom";
import SignIn from "./pages/SignIn";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://localhost:8080";
  axios.defaults.withCredentials = true;

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
