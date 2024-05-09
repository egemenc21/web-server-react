import {Product} from "../mock-data/products";
import Button, {BUTTON_TYPE_CLASSES} from "./Button";
import {useShoppingCart} from "../context/ShoppingCart";

interface ProductItemProps {
  product: Product;
}

function ProductItem({product}: ProductItemProps) {
  const testUserId = 1;
  const {addItemToCart} = useShoppingCart();
  const {productId, productName, description, quantity, price} = product;
  return (
    <li className="w-[30%] p-4 shadow-md">
      <div>{productName}</div>
      <div>{description}</div>
      <div>{quantity}</div>
      <div>{price}</div>
      <div className="flex justify-center p-1">
        <Button
          buttonType={BUTTON_TYPE_CLASSES.base}
          onClick={() => addItemToCart(productId, testUserId)}
        >
          {" "}
          Add to Shopping Cart
        </Button>
      </div>
    </li>
  );
}

export default ProductItem;
