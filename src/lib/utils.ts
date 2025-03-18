import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRoomTypeLabel = (type: string) => {
  switch (type) {
    case "deluxe":
      return "Deluxe";
    case "premium":
      return "Premium";
    case "ultra luxury":
      return "Ultra Luxury";
    default:
      return type;
  }
};

export const getRoomStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-800";
    case "booked":
      return "bg-red-100 text-red-800";
    case "cleaning":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};


export const getAccessToken = () => localStorage.getItem("token");
export const isAuthenticated = () => !!getAccessToken();

export const removeAccessToken = () => {
  localStorage.removeItem("token");
};
