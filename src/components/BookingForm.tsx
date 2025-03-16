import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRoomBookingMutation } from "@/hooks/useRoomBookingMutation";
import { useRooms } from "@/hooks/useRoomQuery";
import { Room } from "@/types";
import { useSearchParams } from "react-router";

const BookingForm = () => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [totalPeople, setTotalPeople] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<Room>();
  const [searchParams] = useSearchParams();

  const { createRoomBookingMutation } = useRoomBookingMutation();
  const { data: rooms } = useRooms();

  const handleProceedToPayment = async () => {
    if (!selectedRoom) return;
    await createRoomBookingMutation.mutateAsync({
      from: checkInDate,
      to: checkOutDate,
      roomId: selectedRoom?._id,
      totalPeople,
      isPaid: false,
      status: "confirmed",
    });
    // navigate to payment gateway or do something else
  };
  const roomTypes = useMemo(() => {
    if (!rooms) return {};
    const roomTypeData: Record<string, Room> = {};
    for (const room of rooms) {
      if (roomTypeData[room.type]) continue;
      roomTypeData[room.type] = room;
    }
    return roomTypeData;
  }, [rooms]);

  useEffect(() => {
    const typeFromParams = searchParams.get("type");
    if (!typeFromParams) return;
    setSelectedRoom(roomTypes[typeFromParams]);
  }, [roomTypes, searchParams]);

  return (
    <section className="py-10 px-4 md:px-8" id="book">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Book Your Stay</h2>
        <Card>
          <CardContent className="p-6 py-2">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label>Check-in Date</Label>
                <Calendar
                  mode="single"
                  selected={checkInDate}
                  onSelect={(v) => (v ? setCheckInDate(v) : {})}
                  className="rounded-md border flex justify-center"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Check-out Date</Label>
                <Calendar
                  mode="single"
                  selected={checkOutDate}
                  onSelect={(v) => (v ? setCheckOutDate(v) : {})}
                  className="rounded-md border flex justify-center "
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <Label>Room Type</Label>
                <Select
                  onValueChange={(v) => {
                    const selectedRoom = roomTypes[v];
                    setSelectedRoom(selectedRoom);
                  }}
                  value={selectedRoom?.type}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(roomTypes)?.map((room, index) => (
                      <SelectItem key={index} value={room.type}>
                        {room.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Number of Guests</Label>
                <Select onValueChange={(v) => setTotalPeople(+v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(selectedRoom?.capacity).keys()].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <Label>Special Requests</Label>
              <Input placeholder="Any special requirements?" />
            </div>
            <Button
              disabled={createRoomBookingMutation.isPending}
              className="w-full mt-6"
              onClick={handleProceedToPayment}
            >
              Proceed to Payment
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingForm;
