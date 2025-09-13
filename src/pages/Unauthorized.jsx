import React from "react";
import Navbar from "@/components/common/Navbar";

const Unauthorized = () => {
  return (
    <div className="bg-[#212121] h-screen w-screen">
      <Navbar />
      <div className="text-center text-white mt-4 px-4 md:mt-8 md:px-8 lg:mt-12 lg:px-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Unauthorized
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl">
          You do not have permission to view this page or your subscription has
          expired.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
