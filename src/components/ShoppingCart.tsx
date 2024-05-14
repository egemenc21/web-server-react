import {useShoppingCart} from "../context/ShoppingCart";
import Button, {BUTTON_TYPE_CLASSES} from "./Button";

function ShoppingCart() {
  const {cartItems, shoppingCartId, clearShoppingCart} = useShoppingCart();
  console.log(cartItems, "shopping cart component");

  const handleDelete = async () => {
    if (shoppingCartId) clearShoppingCart(shoppingCartId);
  };
  return (
    <div className="fixed right-[2%] top-[10%] w-[250px] min-h-[350px] bg-secondary">
      <div className="p-2 text-[#000000] text-center">ShoppingCart</div>
      <div className="flex flex-col justify-between gap-2 p-4">
        {cartItems &&
          cartItems.map((cartItem, index) => (
            <div
              key={index}
              className="flex gap-2 justify-between items-center"
            >
              {/* <div>{cartItem.product.productId}</div> */}
              <div className="relative w-[70px] rounded-full ">
                <img
                  className="object-cover w-full h-full"
                  src={`http://localhost:8080/images/${cartItem.product.imageUrl}`}
                  alt="image"
                />
              </div>
              <div className="text-center text-[#000000]">
                {cartItem?.product?.productName}
              </div>
              <div className="text-center text-[#000000]">
                {cartItem.quantity}
              </div>
            </div>
          ))}
        <Button
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          onClick={handleDelete}
        >
          Empty Basket
        </Button>

        <Button
          buttonType={BUTTON_TYPE_CLASSES.base}
          onClick={handleDelete}
        >
          Go to checkout
        </Button>
      </div>
    </div>
  );
}

export default ShoppingCart;
