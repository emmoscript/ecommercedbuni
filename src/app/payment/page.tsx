"use client";

import React, { useState } from "react";
import Link from "next/link";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "credit-card":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className={`mt-1 block w-full p-2 border rounded ${!cardNumber && !isFormValid ? 'border-red-500' : ''}`}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`mt-1 block w-full p-2 border rounded ${!cardName && !isFormValid ? 'border-red-500' : ''}`}
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700">Expiration Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className={`mt-1 block w-full p-2 border rounded ${!expiryDate && !isFormValid ? 'border-red-500' : ''}`}
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700">CVV</label>
              <input
                type="text"
                placeholder="123"
                className={`mt-1 block w-full p-2 border rounded ${!cvv && !isFormValid ? 'border-red-500' : ''}`}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>
        );
      case "apple-pay":
        return (
          <div className="text-center">
            <p className="text-lg font-medium text-gray-800">
              Apple Pay is selected. Complete the payment via Apple Pay.
            </p>
          </div>
        );
      case "zip-pay":
        return (
          <div className="text-center">
            <p className="text-lg font-medium text-gray-800">
              Zip Pay is selected. Complete the payment via Zip Pay.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const handleConfirmPayment = () => {
    // Form validation for credit card payment method
    if (
      paymentMethod === "credit-card" &&
      cardNumber &&
      cardName &&
      expiryDate &&
      cvv
    ) {
      setPaymentConfirmed(true);
      setIsFormValid(true); // Form is valid
    } else if (paymentMethod !== "credit-card") {
      // If payment method is not credit card, no additional validation required
      setPaymentConfirmed(true);
      setIsFormValid(true);
    } else {
      setIsFormValid(false); // Set form validity to false if any field is empty
    }
  };

  return (
    <div className="bg-gradient-to-r from-cyan-300 to-[#1385fc] w-full min-h-screen p-6 flex items-center justify-center">
      <div className="relative max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
        {paymentConfirmed ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Approved</h2>
            <p className="text-lg font-medium text-gray-800 mb-4">
              Your payment has been successfully processed.
            </p>
            <Link href="/">
              <button
                onClick={() => setPaymentConfirmed(false)}
                className="bg-cyan-300 text-white text-center rounded-3xl p-3 py-2 hover:bg-accent"
              >
                Go Back
              </button>
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment</h2>

            {/* Payment Method Selector */}
            <div className="mb-8">
              <label className="block text-gray-700">Select Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mt-1 block w-full p-2 border rounded"
              >
                <option value="credit-card">Credit/Debit Card</option>
                <option value="apple-pay">Apple Pay</option>
                <option value="zip-pay">Zip Pay</option>
              </select>
            </div>

            {/* Conditional Form Rendering */}
            {paymentMethod === "credit-card" && (
              <div className="relative flex items-center justify-center mb-8">
                <div className="w-full max-w-[350px] h-[220px] perspective">
                  <div className="relative w-full h-full transform-style-preserve-3d transition-transform duration-500">
                    <div className="absolute inset-0 bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col justify-between transform rotate-y-0">
                      <div className="flex flex-col text-white">
                        <div className="text-lg font-medium">Card Number</div>
                        <div className="text-2xl font-bold">
                          {cardNumber || "**** **** **** ****"}
                        </div>
                      </div>
                      <div className="flex justify-between text-white">
                        <div className="text-sm font-medium">
                          {cardName || "John Doe"}
                        </div>
                        <div className="text-sm font-medium">
                          {expiryDate || "MM/YY"}
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col justify-between transform rotate-y-180">
                      <div className="flex items-center justify-between text-white">
                        <div className="text-lg font-medium">CVV</div>
                        <div className="text-2xl font-bold">{cvv || "***"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {renderPaymentForm()}

            <button
              type="button"
              onClick={handleConfirmPayment}
              className="bg-[#243746] text-white text-center w-full rounded-3xl py-2 hover:bg-accent mt-6"
            >
              Confirm Payment
            </button>

            {!isFormValid && (
              <p className="text-red-500 text-center mt-4">Please fill out all required fields.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
