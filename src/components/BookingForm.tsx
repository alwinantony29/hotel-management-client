import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const rooms = [
  {
    type: "Deluxe Suite",
    price: 299,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
    description: "Spacious suite with city views and premium amenities",
  },
  {
    type: "Executive Room",
    price: 199,
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843",
    description: "Modern comfort with a work area and king-size bed",
  },
  {
    type: "Premium Suite",
    price: 399,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    description: "Luxury suite with separate living area and panoramic views",
  },
];

const BookingForm = () => {
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Book Your Stay</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label>Check-in Date</Label>
                <Calendar
                  mode="single"
                  selected={checkInDate}
                  onSelect={setCheckInDate}
                  className="rounded-md border flex justify-center"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Check-out Date</Label>
                <Calendar
                  mode="single"
                  selected={checkOutDate}
                  onSelect={setCheckOutDate}
                  className="rounded-md border flex justify-center "
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <Label>Room Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room, index) => (
                      <SelectItem key={index} value={room.type.toLowerCase()}>
                        {room.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Number of Guests</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map((num) => (
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
            <Button className="w-full mt-6">Proceed to Payment</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingForm;
