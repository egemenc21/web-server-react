// interface HomeProps {}

import Navbar from "../components/Navbar";

function Home() {
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
