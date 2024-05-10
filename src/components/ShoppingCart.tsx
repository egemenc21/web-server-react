import {useShoppingCart} from "../context/ShoppingCart";
import Button, {BUTTON_TYPE_CLASSES} from "./Button";

function ShoppingCart() {
  const {cartItems, shoppingCartId, clearShoppingCart} = useShoppingCart();
  console.log(cartItems, "shopping cart");
  const handleDelete = async () => {
    if (shoppingCartId) clearShoppingCart(shoppingCartId);
  };
  return (
    <div className="fixed right-[2%] top-[10%] w-[250px] h-[350px] bg-secondary">
      <div className="p-2 text-[#000000] text-center">ShoppingCart</div>
      <div>
        {cartItems &&
          cartItems.map((cartItem,index) => (
            <div key={index}>
              {/* <div>{cartItem.product.productId}</div> */}
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
      </div>
    </div>
  );
}

export default ShoppingCart;
