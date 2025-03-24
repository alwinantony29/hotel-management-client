import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRoomBookingQuery } from "@/hooks/useRoomBookingQuery";
import AdminLayout from "@/layouts/AdminLayout";

const BookingsPage = () => {
  const { data: bookings = [], isLoading, isError } = useRoomBookingQuery();

  return (
    <AdminLayout>
      <div className="p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">Room Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading bookings...</p>
            ) : isError ? (
              <p className="text-red-500">Failed to load bookings.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>People</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Status</TableHead>
                    {/* <TableHead className="text-right">Actions</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking._id}>
                      <TableCell className="font-medium">
                        {booking.userId?.name}
                      </TableCell>
                      <TableCell>{booking.roomId?.roomNo}</TableCell>
                      <TableCell>{booking.totalPeople}</TableCell>
                      <TableCell>${booking.totalPrice}</TableCell>
                      <TableCell>
                        {booking.isPaid ? "Paid" : "Pending"}
                      </TableCell>
                      <TableCell>
                        {new Date(booking.from).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(booking.to).toLocaleDateString()}
                      </TableCell>
                      <TableCell
                        className={
                          booking.status === "confirmed"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {booking.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default BookingsPage;
