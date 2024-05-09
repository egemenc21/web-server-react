import Navbar from "../components/Navbar";
import ProductItem from "../components/ProductItem";
import products, {Product} from "../mock-data/products";

// interface ShopProps {}

function Shop() {
  const mockProducts: Product[] = products;
  return (
    <>
      <Navbar />
      <section className="mt-[150px] w-[80%] mx-auto">
        <ul className="flex flex-wrap gap-5 items-center">
          {mockProducts.map((product) => (
            <ProductItem key={product.productId} product={product} />
          ))}
        </ul>
      </section>
    </>
  );
}

export default Shop;
