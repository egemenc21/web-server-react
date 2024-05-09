import {useShoppingCart} from "../context/ShoppingCart";

function ShoppingCart() {
  const {cartItems} = useShoppingCart();
  console.log(cartItems)
  return (
    <div className="fixed right-[2%] top-[10%] w-[250px] h-[350px] bg-secondary">
      <div className="p-2 text-[#000000] text-center">ShoppingCart</div>
      <div>
        {cartItems.map((cartItem) => (
          <div key={cartItem.cartItemId}>
            <div>{cartItem.product.productId}</div>
            <div>{cartItem.quantity}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShoppingCart;
