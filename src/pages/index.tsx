import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import HotelDetails from "@/components/HotelDetails";
import { Reviews } from "@/components/Reviews";
import { RoomDetails } from "@/components/RoomDetails";

// src/pages/index.tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <HotelDetails />
      <RoomDetails />
      <Gallery />
      <Reviews />
      <BookingForm />
      <Footer />
    </div>
  );
}
