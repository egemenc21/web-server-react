import {Product} from "../mock-data/products";
import Button, {BUTTON_TYPE_CLASSES} from "./Button";
import {useShoppingCart} from "../context/ShoppingCart";


interface ProductItemProps {
  product: Product;
}

function ProductItem({product}: ProductItemProps) {

  const {addItemToCart} = useShoppingCart();
  const {productId, productName, description, quantity, price, imageUrl} =
    product;
  return (
    <li className="w-[300px] p-4 shadow-md">
      <div className="relative max-w-[300px] h-[300px]">
        <img
          className="object-cover  w-full h-full"
          src={`http://localhost:8080/images/${imageUrl}`}
          alt="image"
        />
      </div>
      <div className="mt-4">Name: {productName}</div>
      <div>Description: {description}</div>
      <div> Price: {price}</div>
      <div className="flex justify-center p-1">
        <Button
          buttonType={BUTTON_TYPE_CLASSES.base}
          onClick={() => addItemToCart(productId)}
        >
          Add to Shopping Cart
        </Button>
      </div>
    </li>
  );
}

export default ProductItem;
