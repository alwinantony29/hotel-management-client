import CabBookingModal from "@/components/CabBookingModal";
import RoomBookingDetailsDialog from "@/components/RoomBookingDetailsDialog";
import RoomBookingHistoryTable from "@/components/RoomBookingHistoryTable";
import { Button } from "@/components/ui/button";
import { useRoomBookingQuery } from "@/hooks/useRoomBookingQuery";
import UserLayout from "@/layouts/UserLayout";
import { PopulatedRoomBooking } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router";

const BookingHistoryPage = () => {
  const navigate = useNavigate();
  const { data: allBookings } = useRoomBookingQuery({ mine: true });
  const [selectedBooking, setSelectedBooking] =
    useState<PopulatedRoomBooking | null>(null);
  const [roomIdForCabBooking, setRoomIdForCabBooking] = useState<string | null>(
    null
  );

  const today = new Date();

  const currentBookings = allBookings?.filter((booking) => {
    return today >= new Date(booking.from) || today <= new Date(booking.to);
  });

  const pastBookings = allBookings?.filter(
    (booking) => new Date(booking.to) < today
  );

  return (
    <UserLayout>
      <div className="min-h-screen bg-background py-30 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">My Bookings</h1>
            <Button onClick={() => navigate("/")}>Make New Booking</Button>
          </div>
          <RoomBookingHistoryTable
            pastBookings={pastBookings}
            currentBookings={currentBookings}
            setSelectedBooking={setSelectedBooking}
            setRoomIdForCabBooking={setRoomIdForCabBooking}
          />
        </div>
        <RoomBookingDetailsDialog
          selectedBooking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
        <CabBookingModal
          isOpen={!!roomIdForCabBooking}
          close={() => setRoomIdForCabBooking(null)}
          roomBookingId={roomIdForCabBooking || undefined}
        />
      </div>
    </UserLayout>
  );
};

export default BookingHistoryPage;
