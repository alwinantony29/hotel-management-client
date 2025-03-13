import React from "react";
import { ChevronDown } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center">
          Welcome to Grand Azure
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
          Experience luxury redefined in the heart of paradise
        </p>
        <button className="bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all">
          Book Your Stay
        </button>

        <div className="absolute bottom-8 animate-bounce">
          <ChevronDown size={32} />
        </div>
      </div>
    </div>
  );
};
