import axios from "axios";
import Navbar from "../components/Navbar";
import ProductItem from "../components/ProductItem";
import {Product} from "../mock-data/products";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/User";
import { useNavigate } from "react-router-dom";



function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const {userData} = useContext(UserContext);
  const navigate = useNavigate()

  console.log(userData, "shop")
  useEffect(() => {
    if (userData) {
      fetchData();
    }else{
      navigate('/')
    }
  }, [navigate, userData]);

  const fetchData = async () => {
    try {
      const res = await axios.get("/product/all");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  console.log(products);

  return (
    <>
      <Navbar />
      <section className="mt-[150px] w-[80%] mx-auto">
        <ul className="flex flex-wrap gap-5">
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
