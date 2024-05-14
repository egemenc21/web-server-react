import {BrowserRouter} from "react-router-dom";
import UserProvider from "./context/User";
import ShoppingCartProvider from "./context/ShoppingCart";
import { Bounce, ToastContainer } from "react-toastify";


function Providers({children}: {children: React.ReactNode}) {
  return (
    <BrowserRouter>
      <UserProvider>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
        <ShoppingCartProvider>{children}</ShoppingCartProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default Providers;
