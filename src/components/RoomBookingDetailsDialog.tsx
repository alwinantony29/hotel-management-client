import { PopulatedRoomBooking } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { BedDouble, CalendarRange, Users } from "lucide-react";
import { formatDate } from "date-fns";

export default function RoomBookingDetailsDialog({
  selectedBooking,
  onClose,
}: {
  selectedBooking: PopulatedRoomBooking | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!selectedBooking} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
          <DialogDescription>
            Booking ID: {selectedBooking?._id}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Room Image */}
          <div className="aspect-video rounded-lg overflow-hidden">
            <img
              src={
                selectedBooking?.roomId.images[0] ||
                "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              }
              alt={selectedBooking?.roomId.type}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Main Details */}
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <BedDouble className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Room Type</p>
                  <p className="font-medium">{selectedBooking?.roomId?.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Guests</p>
                  <p className="font-medium">
                    {selectedBooking?.totalPeople}{" "}
                    {selectedBooking?.totalPeople === 1 ? "Guest" : "Guests"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <CalendarRange className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Check-in</p>
                  <p className="font-medium">
                    {selectedBooking?.from &&
                      new Date(selectedBooking?.from).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CalendarRange className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Check-out</p>
                  <p className="font-medium">
                    {selectedBooking?.to &&
                      new Date(selectedBooking.to).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Status and Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedBooking?.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {selectedBooking?.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Price
                </p>
                <p className="text-xl font-bold">
                  ₹{selectedBooking?.totalPrice}
                </p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Special Requests</p>
                <p className="text-sm text-muted-foreground">
                  {selectedBooking?.requests || "None"}
                </p>
              </div>

              {/* <div>
                <p className="text-sm font-medium mb-2">Included Add-ons</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {selectedBooking?.addons.map(
                    (addon: string, index: number) => (
                      <li key={index}>{addon}</li>
                    )
                  )}
                </ul>
              </div> */}

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Payment</p>
                  <p className="font-medium">
                    {selectedBooking?.isPaid ? "Paid" : "Not Paid"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Booked On</p>
                  <p className="font-medium">
                    {selectedBooking?.createdAt &&
                      formatDate(
                        new Date(selectedBooking?.createdAt),
                        "d MMM yyyy"
                      )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
