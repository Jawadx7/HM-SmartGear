import heroImage from "../../assets/hero_pic.jpeg"; // rename your image accordingly
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-white min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left Text */}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Discover the Future of{" "}
            <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              SmartGear
            </span>
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Your one-stop tech shop for cutting-edge gadgets and gear. Curated
            with precision. Powered by innovation.
          </p>
          <a
            href="#"
            className="inline-flex items-center bg-black text-white px-6 py-3 rounded-xl text-sm sm:text-base hover:bg-gray-800 transition"
          >
            Try SmartGear <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>

        {/* Right Image */}
        <div className="flex-1 w-full max-w-md">
          <img
            src={heroImage}
            alt="SmartGear Hero"
            className="w-[70%] h-auto rounded-2xl shadow-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
