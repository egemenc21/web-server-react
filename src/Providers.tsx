import {BrowserRouter} from "react-router-dom";
import UserProvider from "./context/User";
import ShoppingCartProvider from "./context/ShoppingCart";

function Providers({children}: {children: React.ReactNode}) {
  return (
    <BrowserRouter>
      <UserProvider>
        <ShoppingCartProvider>{children}</ShoppingCartProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default Providers;
