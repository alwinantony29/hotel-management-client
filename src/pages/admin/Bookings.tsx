import RoomBookingDetailsDialog from "@/components/RoomBookingDetailsDialog";
import RoomBookingHistoryTable from "@/components/RoomBookingHistoryTable";
import { useRoomBookingQuery } from "@/hooks/useRoomBookingQuery";
import AdminLayout from "@/layouts/AdminLayout";
import { PopulatedRoomBooking } from "@/types";
import { useState } from "react";

const BookingsPage = () => {
  const { data: allBookings } = useRoomBookingQuery();
  const [selectedBooking, setSelectedBooking] =
    useState<PopulatedRoomBooking | null>(null);
  const [, setRoomIdForCabBooking] = useState<string | null>(null);

  const today = new Date();

  const currentBookings = allBookings?.filter((booking) => {
    return today >= new Date(booking.from) || today <= new Date(booking.to);
  });

  const pastBookings = allBookings?.filter(
    (booking) => new Date(booking.to) < today
  );

  return (
    <AdminLayout>
      <div className="min-h-screen bg-background py-30 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">All Bookings</h1>
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
      </div>
    </AdminLayout>
  );
};

export default BookingsPage;
