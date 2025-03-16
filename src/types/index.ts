export type User = {
  _id: string;
  name: string;
  email: string;
  phoneNo: string;
};

export type Room = {
  _id: string;
  roomNo: string;
  type: "deluxe" | "premium" | "ultra luxury";
  capacity: number;
  status: "available" | "cleaning" | "booked";
  images: string[];
  description: string[];
  price: number;
};

export type RoomBooking = {
  _id: string;
  userId: string;
  roomId: string;
  totalPeople: number;
  isPaid: boolean;
  status: "confirmed" | "cancelled";
  from: string | Date;
  to: string | Date;
  totalPrice: number;
  paymentMethod?: string;
  createdAt: string;
};

export type PopulatedRoomBooking = Omit<RoomBooking, "roomId"> & {
  roomId: Room;
};

export type CabBooking = {
  _id: string;
  userId: string;
  driverId: string;
  pickUpAddress: string;
  date: Date;
  status: string;
  fare: number;
};
