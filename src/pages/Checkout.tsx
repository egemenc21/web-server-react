import Navbar from "../components/Navbar";
import {useShoppingCart} from "../context/ShoppingCart";
import {MdDelete} from "react-icons/md";
import {useContext, useEffect} from "react";
import {UserContext} from "../context/User";
import {useNavigate} from "react-router-dom";
import Button, {BUTTON_TYPE_CLASSES} from "../components/Button";
import { toast } from "react-toastify";


function Checkout() {
  const {cartItems, shoppingCartId, deleteItemFromCart, clearShoppingCart} =
    useShoppingCart();

  const navigate = useNavigate();
  const {userData} = useContext(UserContext);

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, [navigate, userData]);
  const totalAmount = cartItems.reduce(
    (acc, cartItem) => acc + cartItem.product.price * cartItem.product.quantity,
    0
  );
  const handleDelete = async () => {
    try {
      if (userData)
        if (shoppingCartId)
          clearShoppingCart(shoppingCartId);
          toast.success( `#${Math.floor(Math.random() * 1000000 + 13)} Order submitted successfully!`)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <section className="mt-[150px] w-[80%] mx-auto">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="border p-2">Image</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {cartItems &&
              cartItems.map((cartItem, index) => (
                <tr key={index} className="border">
                  <td className="border flex justify-center p-2">
                    <img
                      className="object-cover w-[120px] h-[120px]"
                      src={`http://localhost:8080/images/${cartItem.product.imageUrl}`}
                      alt="image"
                    />
                  </td>
                  <td className="border text-center p-2 ">
                    {cartItem?.product?.productName}
                  </td>
                  <td className="border text-center p-2 ">
                    {cartItem.quantity}
                  </td>

                  <td className="border text-center p-2 ">
                    <button
                      onClick={() => deleteItemFromCart(cartItem.cartItemId)}
                    >
                      <MdDelete size={25} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="text-center">{totalAmount} TL</div>

        <div className="text-center">
          {cartItems.length !== 0 && (
            <Button
              buttonType={BUTTON_TYPE_CLASSES.base}
              onClick={handleDelete}
            >
              BUY
            </Button>
          )}
        </div>
      </section>
    </>
  );
}

export default Checkout;
