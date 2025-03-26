import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCabBookingMutation } from "@/hooks/useCabBookingMutation";
import { useRoomBookingMutation } from "@/hooks/useRoomBookingMutation";
import { useQueryClient } from "@tanstack/react-query";

export default function CabBookingModal({
  close,
  isOpen,
  roomBookingId,
}: {
  isOpen: boolean;
  close: () => void;
  roomBookingId?: string;
}) {
  const queryClient = useQueryClient();
  const [pickupDate, setPickupDate] = useState<Date>();
  const [pickupTime, setPickupTime] = useState("");
  const [pickUpAddress, setPickUpAddress] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const { createCabBooking } = useCabBookingMutation();
  const { updateRoomBookingMutation } = useRoomBookingMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomBookingId) return;
    if (!pickupDate) return;
    // TODO: use same state for date & time

    const res = await createCabBooking.mutateAsync({
      date: pickupDate,
      status: "pending",
      pickUpAddress: pickUpAddress,
      fare: 20,
    });
    await updateRoomBookingMutation.mutateAsync({
      id: roomBookingId,
      updates: { cabId: res._id },
    });
    await queryClient.invalidateQueries({ queryKey: ["bookings", "rooms"] });
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book a Cab</DialogTitle>
          <DialogDescription>
            Schedule a pickup from the airport or train station to our hotel.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pickup-date">Pickup Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !pickupDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {pickupDate ? (
                    format(pickupDate, "PPP")
                  ) : (
                    <span>Pick a Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={pickupDate}
                  onSelect={setPickupDate}
                  initialFocus
                  fromDate={new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pickup-time">Pickup Time</Label>
            <Select value={pickupTime} onValueChange={setPickupTime}>
              <SelectTrigger id="pickup-time">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 }, (_, i) => {
                  const hour = i.toString().padStart(2, "0");
                  return [
                    <SelectItem
                      key={`${hour}:00`}
                      value={`${hour}:00`}
                    >{`${hour}:00`}</SelectItem>,
                    <SelectItem
                      key={`${hour}:30`}
                      value={`${hour}:30`}
                    >{`${hour}:30`}</SelectItem>,
                  ];
                }).flat()}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="passengers">Number of Passengers</Label>
            <Select value={passengers} onValueChange={setPassengers}>
              <SelectTrigger id="passengers">
                <SelectValue placeholder="Select passengers" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Passenger" : "Passengers"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="special-instructions">Pickup Address</Label>
            <Input
              id="pickUpAddress"
              placeholder="ABC Road square junction "
              value={pickUpAddress}
              onChange={(e) => setPickUpAddress(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="special-instructions">Special Instructions</Label>
            <Input
              id="special-instructions"
              placeholder="Flight number, additional requirements, etc."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button type="submit">Book Cab</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
