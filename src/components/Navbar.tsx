import {useEffect, useState} from "react";
import navbarLinks, {NavbarLinkProps} from "../mock-data/navbar";
import NavbarLink from "./NavbarLink";
import ShoppingCart from "./ShoppingCart";
import {LuShoppingBasket} from "react-icons/lu";
import {useShoppingCart} from "../context/ShoppingCart";
function Navbar() {
  const [stateOfCart, setStateOfCart] = useState(false);
  const {cartItems} = useShoppingCart();
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity;
    });
    setTotalQuantity(total);
  }, [cartItems]);
  
  const navLinks: NavbarLinkProps[] = navbarLinks;
  return (
    <header className="fixed left-0 z-[105] top-0 w-full bg-tertiary mx-auto py-8 font-semibold tracking-wider text-primary md:border-b border-b-secondary">
      <nav className="flex justify-between items-center mx-auto w-[85%]">
        {/* <h1 className="text-3xl">
          <Link to={navBarContent.heading.href}>
            {navBarContent.heading.title}
          </Link>
        </h1> */}

        <ul className="flex items-center justify-center gap-12 text-lg">
          {navLinks?.map(({title, href}) => (
            <NavbarLink href={href} key={href} title={title} />
          ))}
        </ul>
        <div className="flex flex-col items-center">
          <LuShoppingBasket
            size={25}
            className="cursor-pointer"
            onClick={() => setStateOfCart(!stateOfCart)}
          />
          {totalQuantity}
        </div>
      </nav>
      {stateOfCart && <ShoppingCart />}
    </header>
  );
}

export default Navbar;
