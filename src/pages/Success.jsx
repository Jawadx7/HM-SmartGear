import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, Loader2 } from "lucide-react";
import { useCartStore } from "../store/AppStore";

const PAYSTACK_SECRET_KEY = import.meta.env.VITE_PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = import.meta.env.VITE_PAYSTACK_BASE_URL;

const Success = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);

  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) {
        setError("No payment reference found");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
          {
            headers: {
              Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await res.json();

        if (result.status && result.data.status === "success") {
          setVerified(true);
          clearCart();

          const allPayments = JSON.parse(
            localStorage.getItem("payment_records") || "[]"
          );
          const updated = allPayments.map((p) =>
            p.reference === reference
              ? {
                  ...p,
                  status: "success",
                  verified_at: new Date().toISOString(),
                }
              : p
          );
          localStorage.setItem("payment_records", JSON.stringify(updated));
        } else {
          throw new Error("Payment verification failed");
        }
      } catch (err) {
        setError(err.message || "Error verifying payment");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [reference]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 px-4 py-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
          <Loader2 className="mx-auto h-10 w-10 text-green-600 animate-spin" />
          <p className="text-gray-600 text-base sm:text-lg">
            Verifying your payment...
          </p>
        </div>
      </div>
    );
  }

  if (error || !verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 px-4 py-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
          <h1 className="text-xl font-bold text-red-600 sm:text-2xl">
            Payment Verification Failed
          </h1>
          <p className="text-gray-600">{error || "Something went wrong."}</p>
          <a
            href="/"
            className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-md"
          >
            Go back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
        <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          Payment Successful!
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Thank you for your payment. Your transaction was completed
          successfully.
        </p>
        <a
          href="/"
          className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out text-sm sm:text-base"
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default Success;
