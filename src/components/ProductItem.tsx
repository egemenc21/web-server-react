import {Product} from "../mock-data/products";
import Button, {BUTTON_TYPE_CLASSES} from "./Button";

interface ProductItemProps {
  product: Product;
}

function ProductItem({product}: ProductItemProps) {
  const {productName, description, quantity, price} = product;
  return (
    <li className="w-[30%] p-4 shadow-md">
      <div>{productName}</div>
      <div>{description}</div>
      <div>{quantity}</div>
      <div>{price}</div>
      <div className="flex justify-center p-1">
        <Button buttonType={BUTTON_TYPE_CLASSES.base}>
          {" "}
          Add to Shopping Cart
        </Button>
      </div>
    </li>
  );
}

export default ProductItem;
