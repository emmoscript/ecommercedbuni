"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

const Checkout = () => {
  const router = useRouter(); // Initialize router for navigation

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);

  const products = useAppSelector((state) => state.cartReducer);

  const getTotal = () => {
    let total = 0;
    products.forEach((item) => (total += item.price * item.quantity));
    return total;
  };

  // Function to handle form submission
  const handlePayNow = () => {
    if (
      fullName &&
      email &&
      address &&
      city &&
      state &&
      zipCode
    ) {
      router.push("/payment");
    } else {
      setIsFormValid(false); // Set form validity to false if any field is empty
    }
  };

  return (
    <div className="bg-gradient-to-r from-cyan-300 to-[#1385fc] w-full min-h-screen p-6 flex items-center justify-center">
      <div className="relative max-w-[600px] w-full bg-white p-6 rounded-lg shadow-lg">
        {/* Close Button */}
        <RxCross1
          className="absolute right-4 top-4 text-[24px] cursor-pointer"
          onClick={() => router.push('/')}
        />

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h2>

        <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Order Summary</h3>
          <div className="space-y-4">
            {products.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between">
                <img src={item.img} alt={item.title} className="w-16 h-16 object-cover" />
                <div className="flex-1 ml-4">
                  <h4 className="text-lg font-medium text-gray-800">{item.title}</h4>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">${item.price} each</p>
                </div>
                <p className="text-lg font-medium text-gray-800">
                  ${item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center text-xl font-medium">
            <p>Total:</p>
            <p>${getTotal()}</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className={`mt-1 block w-full p-2 border rounded ${!fullName && !isFormValid ? 'border-red-500' : ''}`}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="john.doe@example.com"
                className={`mt-1 block w-full p-2 border rounded ${!email && !isFormValid ? 'border-red-500' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Shipping Address</label>
            <textarea
              placeholder="123 Main St, Apt 4B, New York, NY 10001"
              className={`mt-1 block w-full p-2 border rounded ${!address && !isFormValid ? 'border-red-500' : ''}`}
              rows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              placeholder="New York"
              className={`mt-1 block w-full p-2 border rounded ${!city && !isFormValid ? 'border-red-500' : ''}`}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">State</label>
              <input
                type="text"
                placeholder="NY"
                className={`mt-1 block w-full p-2 border rounded ${!state && !isFormValid ? 'border-red-500' : ''}`}
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">ZIP Code</label>
              <input
                type="text"
                placeholder="10001"
                className={`mt-1 block w-full p-2 border rounded ${!zipCode && !isFormValid ? 'border-red-500' : ''}`}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handlePayNow}
            className="bg-cyan-300 text-white text-center w-full rounded-3xl py-2 hover:bg-[#1385fc] mt-6"
          >
            Pay Now
          </button>

          {!isFormValid && (
            <p className="text-red-500 text-center mt-4">Please fill out all required fields.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Checkout;
