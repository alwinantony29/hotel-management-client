import React from "react";
import { ChevronDown } from "lucide-react";
import { useUser } from "@/store/useUser";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

export const Hero: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <div className="relative h-screen" id="home">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center">
          Welcome to Grand Azure
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
          Experience luxury redefined in the heart of paradise
        </p>
        {user ? (
          <a
            href="#book"
            className="bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            Book Your Stay
          </a>
        ) : (
          <Button
            onClick={() => navigate("/login")}
            className="bg-white text-gray-900 p-5 py-6 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            Get Started
          </Button>
        )}

        <div className="absolute bottom-8 animate-bounce">
          <ChevronDown size={32} />
        </div>
      </div>
    </div>
  );
};
