export type UserRole = "admin" | "customer" | "driver";

export type User = {
  _id: string;
  name: string;
  email: string;
  phoneNo: string;
  role: UserRole;
};

export type Room = {
  _id: string;
  roomNo: string;
  type: "deluxe" | "premium" | "presidential" | "ultra luxury";
  capacity: number;
  status: "available" | "cleaning" | "booked";
  images: string[];
  description: string[];
  price: number;
};

export type RoomBooking = {
  _id: string;
  userId: User;
  roomId: string;
  cabId: string;
  totalPeople: number;
  isPaid: boolean;
  status: "confirmed" | "cancelled";
  from: string | Date;
  to: string | Date;
  totalPrice: number;
  paymentMethod?: string;
  createdAt: string;
  requests: string;
};

export type PopulatedRoomBooking = Omit<RoomBooking, "roomId"> & {
  roomId: Room;
};

export type CabBooking = {
  _id: string;
  userId?: User;
  driverId?: string;
  pickUpAddress: string;
  date: Date;
  status: "pending" | "accepted" | "fulfilled";
  fare: number;
};