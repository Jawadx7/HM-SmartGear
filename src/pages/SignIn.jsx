import SignInForm from "../components/ui/auth/signin-form";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white sm:text-gray-900 mb-2">
            Welcome Back 😊
          </h1>
          <p className="text-white sm:text-gray-600">
            Sign in to continue your shopping journey
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-lg shadow-md border border-white/20 p-8">
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
