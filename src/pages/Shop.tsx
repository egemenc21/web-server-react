import axios from "axios";
import Navbar from "../components/Navbar";
import ProductItem from "../components/ProductItem";
import {Product} from "../mock-data/products";
import {useEffect, useState} from "react";

// interface ShopProps {}

function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/product/all");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [] );
  
  console.log(products);
  
  return (
    <>
      <Navbar />
      <section className="mt-[150px] w-[80%] mx-auto">
        <ul className="flex flex-wrap gap-5 items-center">
          {products &&
            products.map((product) => (
              <ProductItem key={product.productId} product={product} />
            ))}
        </ul>
      </section>
    </>
  );
}

export default Shop;
