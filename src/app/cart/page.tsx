"use client";

import { RxCross1 } from "react-icons/rx";
import CartProduct from "@/components/front-end/CartProduct"; // Adjust the import path if needed
import { useAppSelector } from "@/redux/hooks";
import Link from 'next/link';

const CartPage = () => {
  const products = useAppSelector((state) => state.cartReducer);

  const getTotal = () => {
    let total = 0;
    products.forEach((item) => (total += item.price * item.quantity));
    return total;
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1385fc' }}>
      <div className="max-w-[400px] w-full bg-white p-6 rounded-lg shadow-lg relative">
        
        
        <Link href="/">
        <RxCross1
          className="absolute right-4 top-4 text-[24px] cursor-pointer"
        />
        </Link>
        <h3 className="text-lg font-medium text-gray-600 uppercase mb-4">Your Cart</h3>

        <div className="space-y-4">
          {products?.map((item: any) => (
            <CartProduct
              key={item.id}
              id={item.id}
              img={item.img}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </div>

        <div className="flex justify-between items-center font-medium text-xl py-4 mt-6 border-t">
          <p>Total:</p>
          <p>${getTotal()}</p>
        </div>

        <Link href="/checkout">
          <button className="bg-[#243746] text-white text-center w-full rounded-3xl py-2 hover:bg-accent mt-4">
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
