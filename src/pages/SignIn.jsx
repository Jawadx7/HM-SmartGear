// import { Eye, EyeOff, Mail, Lock, ShoppingBag, ArrowRight } from "lucide-react";
import SignInForm from "../components/ui/auth/signin-form";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <>
        <div className="w-full sm:w-[30rem] h-[50vh] sm:h-[30rem] rounded-b-full sm:rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 fixed top-0 left-0 sm:-top-40 sm:-left-40 z-0"></div>

        <div className="hidden sm:block w-[30rem] h-[30rem] rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 fixed -bottom-40 -right-40 z-0 opacity-50 blur-3xl"></div>
      </>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          {/* <div className="flex items-center justify-center mb-4">
             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-2xl shadow-lg">
              <ShoppingBag className="w-8 h-8 text-white" />
              SB
            </div>
          </div> */}
          <h1 className="text-3xl font-bold text-white sm:text-gray-900 mb-2">
            Welcome Back 😊
          </h1>
          <p className="text-white sm:text-gray-600">
            Sign in to continue your shopping journey
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-lg shadow-sm border border-white/20 p-8">
          <SignInForm />

          <div className="text-center mt-6 pt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
              >
                Sign up for free
              </a>
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            By signing in, you agree to our{" "}
            <a href="#" className="text-indigo-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-indigo-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
