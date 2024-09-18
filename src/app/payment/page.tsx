// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
//   throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined!");
// }

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// const Payment = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const router = useRouter();

//   const { customer, email, phone, address, items, amount } = router.query; // Assuming these are passed via query params

//   const [isProcessing, setIsProcessing] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const [paymentMethod, setPaymentMethod] = useState("credit-card");
//   const [cardNumber, setCardNumber] = useState("");
//   const [cardName, setCardName] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [paymentConfirmed, setPaymentConfirmed] = useState(false);
//   const [isFormValid, setIsFormValid] = useState(true);

//   const handlePayment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsProcessing(true);

//     try {
//       const response = await fetch("/api/payment-intent", {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({amount, customer, email, phone, address, items}),
//       });

//       const { clientSecret } = await response.json();

//       if (!clientSecret) {
//         setErrorMessage("Failed to create payment intent");
//         setIsProcessing(false);
//         return;
//       }

//       const { error, paymentIntent } = await stripe!.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements!.getElement(CardElement)!,
//         },
//       });

//       if (error) {
//         setErrorMessage(error.message || "Payment failed");
//         setIsProcessing(false);
//         return;
//       }

//       if (paymentIntent.status === "succeeded") {
//         // Redirect to a success page after successful payment
//         router.push("/success");
//       }

//     } catch (error) {
//       setErrorMessage("Payment failed. Please try again.");
//     }

//     setIsProcessing(false);
//   };

//   const renderPaymentForm = () => {
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className="block text-gray-700">Card Number</label>
//               <input
//                 type="text"
//                 placeholder="1234 5678 9012 3456"
//                 className={`mt-1 block w-full p-2 border rounded ${!cardNumber && !isFormValid ? 'border-red-500' : ''}`}
//                 value={cardNumber}
//                 onChange={(e) => setCardNumber(e.target.value)}
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-gray-700">Cardholder Name</label>
//                 <input
//                   type="text"
//                   placeholder="John Doe"
//                   className={`mt-1 block w-full p-2 border rounded ${!cardName && !isFormValid ? 'border-red-500' : ''}`}
//                   value={cardName}
//                   onChange={(e) => setCardName(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Expiration Date</label>
//                 <input
//                   type="text"
//                   placeholder="MM/YY"
//                   className={`mt-1 block w-full p-2 border rounded ${!expiryDate && !isFormValid ? 'border-red-500' : ''}`}
//                   value={expiryDate}
//                   onChange={(e) => setExpiryDate(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-gray-700">CVV</label>
//               <input
//                 type="text"
//                 placeholder="123"
//                 className={`mt-1 block w-full p-2 border rounded ${!cvv && !isFormValid ? 'border-red-500' : ''}`}
//                 value={cvv}
//                 onChange={(e) => setCvv(e.target.value)}
//               />
//             </div>
//           </div>
//         );
//   };

//   // const handleConfirmPayment = () => {
//   //   // Form validation for credit card payment method
//   //   if (
//   //     paymentMethod === "credit-card" &&
//   //     cardNumber &&
//   //     cardName &&
//   //     expiryDate &&
//   //     cvv
//   //   ) {
//   //     setPaymentConfirmed(true);
//   //     setIsFormValid(true); // Form is valid
//   //   } else if (paymentMethod !== "credit-card") {
//   //     // If payment method is not credit card, no additional validation required
//   //     setPaymentConfirmed(true);
//   //     setIsFormValid(true);
//   //   } else {
//   //     setIsFormValid(false); // Set form validity to false if any field is empty
//   //   }
//   // };

//   return (
//     <>
//     <Elements stripe={stripePromise}>
//     <div className="bg-gradient-to-r from-cyan-300 to-[#1385fc] w-full min-h-screen p-6 flex items-center justify-center">
//       <div className="relative max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
//         <form onSubmit={handlePayment}>
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment</h2>
//           <div className="mb-8">
//             <p>Amount: ${amount}</p>
//             <p>Customer: {customer}</p>
//             <CardElement className="mt-4 p-4 border rounded-lg" />
//           </div>
//           <button
//             type="submit"
//             className="bg-[#243746] text-white text-center w-full rounded-3xl py-2 hover:bg-accent mt-6"
//             disabled={!stripe || isProcessing}
//           >
//             {isProcessing ? "Processing..." : "Pay"}
//           </button>
//           {errorMessage && (
//             <p className="text-red-500 text-center mt-4">{errorMessage}</p>
//           )}
//         </form>
//       </div>
//     </div>
//   </Elements>
//   </>
//   );
// };

// export default Payment;

"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "@/components/PaymentForm/PaymentForm"; // Move form logic to a component

// Load your Stripe publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default PaymentPage;

