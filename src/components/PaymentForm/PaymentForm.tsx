"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Use the correct hooks from next/navigation
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const searchParams = useSearchParams(); // Use searchParams to get the query params

  // Extract query parameters
  const customer = searchParams.get("customer");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const address = searchParams.get("address");
  const items = searchParams.get("items");
  const amount = searchParams.get("amount");

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch("/api/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, customer, email, phone, address, items }),
      });

      const { clientSecret } = await response.json();

      if (!clientSecret) {
        setErrorMessage("Failed to create payment intent");
        setIsProcessing(false);
        return;
      }

      const { error, paymentIntent } = await stripe!.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements!.getElement(CardElement)!,
        },
      });

      if (error) {
        setErrorMessage(error.message || "Payment failed");
        setIsProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        router.push("/"); // Navigate to success page
      }
    } catch (error) {
      setErrorMessage("Payment failed. Please try again.");
    }

    setIsProcessing(false);
  };

  return (
    <div className="bg-gradient-to-r from-cyan-300 to-[#1385fc] w-full min-h-screen p-6 flex items-center justify-center">
      <div className="relative max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handlePayment}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment</h2>
          <div className="mb-8">
            <p>Amount: ${amount}</p>
            <p>Customer: {customer}</p>
            <CardElement />
          </div>
          <button
            type="submit"
            className="bg-[#243746] text-white text-center w-full rounded-3xl py-2 hover:bg-accent mt-6"
            disabled={!stripe || isProcessing}
          >
            {isProcessing ? "Processing..." : "Pay"}
          </button>
          {errorMessage && (
            <p className="text-red-500 text-center mt-4">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
