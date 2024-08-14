"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/front-end/ProductCard";
import axios from "axios";
import Footer from "@/components/front-end/Footer";
import Navbar from "@/components/front-end/Navbar";
import Cart from "@/components/front-end/Cart";

interface IProduct {
  _id: string;
  imgSrc: string;
  filekey: string;
  name: string;
  category: string;
  price: number;
}

const ProductsPage = () => {
  
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/get_products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <Navbar setShowCart={setShowCart} />
      {showCart && <Cart setShowCart={setShowCart} />}
      <div className="container mt-32 px-4">
        <div className="sm:flex justify-between items-center">
          <h2 className="text-4xl font-medium">All Products</h2>
          <div className="text-gray-500 flex gap-4 text-xl mt-4 sm:mt-0">
            <div className="text-black">Top Sellers</div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
          {products.map((item: IProduct) => (
            <ProductCard
              key={item._id}
              id={item._id}
              img={item.imgSrc}
              category={item.category}
              title={item.name}
              price={item.price}
            />
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProductsPage;
