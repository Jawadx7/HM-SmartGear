import React from "react";
import gadgetImage from "../../assets/main-logo2.jpg"; // Replace with your image

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-20 bg-white font-sans">
      <div className="md:w-1/2 text-left">
        <h1 className="text-5xl md:text-6xl font-bold text-black leading-tight">
          Discover the Future of <br />
          <span className="bg-gradient-to-r from-blue-500 via-teal-400 to-green-500 text-transparent bg-clip-text">
            SmartGear
          </span>
        </h1>
        <p className="text-gray-600 text-lg mt-6">
          Your one-stop tech shop for cutting-edge gadgets and gear.
          Curated with precision. Powered by innovation.
        </p>
        <button className="mt-8 px-6 py-3 bg-black text-white rounded-lg text-lg hover:bg-gray-900 transition">
          <a href="/signup">Try SmartGear</a>
        </button>
      </div>

      <div className="md:w-1/2 mt-12 md:mt-0">
        <img
          src={gadgetImage}
          alt="Smart Gadget"
          className="w-full max-w-md mx-auto rounded-3xl"
        />
      </div>
    </section>
  );
};

export default Hero;
