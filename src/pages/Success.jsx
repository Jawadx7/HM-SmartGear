import { CheckCircle } from "lucide-react";

const Success = () => {
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
