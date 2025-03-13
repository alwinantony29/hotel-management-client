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
