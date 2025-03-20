import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import HotelDetails from "@/components/HotelDetails";
import { Reviews } from "@/components/Reviews";
import { RoomDetails } from "@/components/RoomDetails";
import UserLayout from "@/layouts/UserLayout";
import { useUser } from "@/store/useUser";

export default function Home() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-white">
      <UserLayout>
        <Hero />
        <HotelDetails />
        <RoomDetails />
        <Gallery />
        <Reviews />
        {user && <BookingForm />}
        <Footer />
      </UserLayout>
    </div>
  );
}
