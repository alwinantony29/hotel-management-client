import RoomBookingDetailsDialog from "@/components/RoomBookingDetailsDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRoomBookingQuery } from "@/hooks/useRoomBookingQuery";
import { PopulatedRoomBooking } from "@/types";
import { CalendarCheck, History } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const BookingHistoryPage = () => {
  const navigate = useNavigate();
  const { data: allBookings } = useRoomBookingQuery();
  const [selectedBooking, setSelectedBooking] =
    useState<PopulatedRoomBooking | null>(null);

  console.log("🚀 ~ BookingHistoryPage ~ allBookings:", allBookings);

  const today = new Date();

  const currentBookings = allBookings?.filter(
    (booking) =>
      today >= new Date(booking.from) && today <= new Date(booking.to)
  );

  const pastBookings = allBookings?.filter(
    (booking) => new Date(booking.to) < today
  );

  //   const currentBookings = [
  //     {
  //       id: "BK001",
  //       roomType: "Deluxe Suite",
  //       checkIn: "2025-04-15",
  //       checkOut: "2025-04-20",
  //       guests: 2,
  //       status: "Confirmed",
  //       totalPrice: 1495,
  //     },
  //   ];

  //   const pastBookings = [
  //     {
  //       id: "BK002",
  //       roomType: "Executive Room",
  //       checkIn: "2024-12-10",
  //       checkOut: "2024-12-15",
  //       guests: 1,
  //       status: "Completed",
  //       totalPrice: 995,
  //     },
  //     {
  //       id: "BK003",
  //       roomType: "Premium Suite",
  //       checkIn: "2024-11-20",
  //       checkOut: "2024-11-25",
  //       guests: 2,
  //       status: "Completed",
  //       totalPrice: 1995,
  //     },
  //   ];

  return (
    <div className="min-h-screen bg-background py-30 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <Button onClick={() => navigate("/")}>Make New Booking</Button>
        </div>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="current" className="flex items-center">
              <CalendarCheck className="w-4 h-4 mr-2" />
              Current Bookings
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center">
              <History className="w-4 h-4 mr-2" />
              Past Bookings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeadings />
                  <TableBody>
                    {currentBookings?.map((booking) => (
                      <TableRow key={booking._id}>
                        <TableCell>{booking.roomId?.type}</TableCell>
                        <TableCell>
                          {new Date(booking.from).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(booking.to).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{booking.totalPeople}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {booking.status}
                          </span>
                        </TableCell>
                        <TableCell>${booking.totalPrice}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => setSelectedBooking(booking)}
                            variant="outline"
                            size="sm"
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past">
            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeadings />
                  <TableBody>
                    {pastBookings?.map((booking) => (
                      <TableRow key={booking._id}>
                        <TableCell>{booking.roomId?.type}</TableCell>
                        <TableCell>
                          {new Date(booking.from).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(booking.to).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{booking.totalPeople}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {booking.status}
                          </span>
                        </TableCell>
                        <TableCell>${booking.totalPrice}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => setSelectedBooking(booking)}
                            variant="outline"
                            size="sm"
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <RoomBookingDetailsDialog
        selectedBooking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
};

function TableHeadings() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Room Type</TableHead>
        <TableHead>Check-in</TableHead>
        <TableHead>Check-out</TableHead>
        <TableHead>Guests</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Total</TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default BookingHistoryPage;
