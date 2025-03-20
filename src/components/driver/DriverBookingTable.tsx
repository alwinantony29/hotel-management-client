import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCabBookingMutation } from "@/hooks/useCabBookingMutation";
import { formatDate } from "@/lib/utils";
import { useUser } from "@/store/useUser";
import { CabBooking } from "@/types";

export const DriverBookingTable = ({
  status,
  bookings,
}: {
  status: string;
  bookings: CabBooking[];
}) => {
  const { user } = useUser();

  const { updateCabBooking } = useCabBookingMutation();

  const handleBooking = (tripId: string, status: "accepted" | "fulfilled") => {
    updateCabBooking.mutate({
      tripId,
      updateData: { driverId: user?._id, status },
    });
  };

  const filteredBookings = bookings.filter((booking) =>
    status === "active"
      ? booking.status === "accepted" && booking.driverId === user?._id
      : status === "passive"
      ? booking.status === "fulfilled" && booking.driverId === user?._id
      : booking.status === "pending"
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User Name</TableHead>
          <TableHead>Pick-up Address</TableHead>
          <TableHead>Fare</TableHead>
          <TableHead>Date</TableHead>
          {status === "pending" && <TableHead>Action</TableHead>}
          {status === "active" && <TableHead>Complete</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredBookings.map((booking) => (
          <TableRow key={booking._id}>
            <TableCell>{booking.userId?.name || "N/A"}</TableCell>
            <TableCell>{booking.pickUpAddress}</TableCell>
            <TableCell>${booking.fare}</TableCell>
            <TableCell>{formatDate(booking.date)}</TableCell>
            {status === "pending" && (
              <TableCell>
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => handleBooking(booking._id, "accepted")}
                >
                  Accept
                </Button>
              </TableCell>
            )}
            {status === "active" && (
              <TableCell>
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => handleBooking(booking._id, "fulfilled")}
                >
                  Done
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
