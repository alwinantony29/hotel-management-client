import { api } from "@/lib/axios";
import { PopulatedRoomBooking } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useRoomBookingQuery = () => {
  return useQuery({
    queryKey: ["bookings", "rooms"],
    queryFn: async () => {
      const { data } = await api.get("/roombookings");
      return data as PopulatedRoomBooking[];
    },
  });
};
