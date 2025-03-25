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
import { useUser } from "@/store/useUser";
import { PopulatedRoomBooking } from "@/types";
import { CalendarCheck, History } from "lucide-react";

type RoomBookingHistoryTableProps = {
  setSelectedBooking: (booking: PopulatedRoomBooking) => void;
  currentBookings?: PopulatedRoomBooking[];
  pastBookings?: PopulatedRoomBooking[];
  setRoomIdForCabBooking: (roomBookingId: string) => void;
};

const RoomBookingHistoryTable: React.FC<RoomBookingHistoryTableProps> = ({
  setSelectedBooking,
  currentBookings,
  pastBookings,
  setRoomIdForCabBooking,
}) => {
  const { user } = useUser();
  const role = user?.role;
  console.log(currentBookings);

  return (
    <div>
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
                      <TableCell>{booking.userId?.name}</TableCell>

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
                      <TableCell>₹{booking.totalPrice}</TableCell>
                      <TableCell>
                        <div className="flex gap-5">
                          <Button
                            onClick={() => setSelectedBooking(booking)}
                            variant="outline"
                            size="sm"
                          >
                            View Details
                          </Button>
                          {role === "customer" && (
                            <>
                              {" "}
                              {booking.cabId ? (
                                <Button
                                  className="bg-green-100"
                                  size="sm"
                                  variant="outline"
                                >
                                  Cab booked
                                </Button>
                              ) : (
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() =>
                                    setRoomIdForCabBooking(booking._id)
                                  }
                                >
                                  Book a Cab
                                </Button>
                              )}{" "}
                            </>
                          )}
                        </div>
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
                      <TableCell>{booking.userId?.name}</TableCell>

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
                      <TableCell>₹{booking.totalPrice}</TableCell>
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
  );
};

export default RoomBookingHistoryTable;

function TableHeadings() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Booked By</TableHead>
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
