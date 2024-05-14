

import {useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import {useContext, useEffect} from "react";
import {UserContext} from "../context/User";

function Home() {
  const {userData} = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, [navigate, userData]);
  return (
    <>
      <Navbar />
      <section className="mt-[90px]  bg-primary">
        <div className="pt-5 w-[80%] mx-auto h-[100vh] text-[#000000]">
          Home
        </div>
      </section>
    </>
  );
}

export default Home;
