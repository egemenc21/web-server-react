import {Product} from "../mock-data/products";
import Button, {BUTTON_TYPE_CLASSES} from "./Button";
import {useShoppingCart} from "../context/ShoppingCart";

interface ProductItemProps {
  product: Product;
}

function ProductItem({product}: ProductItemProps) {
  const testUserId = 1;
  const {addItemToCart} = useShoppingCart();
  const {productId, productName, description, quantity, price, imageUrl} =
    product;
  return (
    <li className="w-[23%] p-4 shadow-md">
      <div className="relative w-[300px] h-[300px]">
        <img
          className="object-cover  w-full h-full"
          src={`http://localhost:8080/images/${imageUrl}`}
          alt="image"
        />
      </div>
      <div className="mt-4">Name: {productName}</div>
      <div>Description: {description}</div>
      <div>Quantity: {quantity}</div>
      <div> Price: {price}</div>
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
