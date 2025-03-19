import { api } from "@/lib/axios";
import { PopulatedRoomBooking } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useRoomBookingQuery = (args?: { mine: boolean }) => {
  return useQuery({
    queryKey: ["bookings", "rooms"],
    queryFn: async () => {
      const { data } = await api.get(
        "/roombookings" + (args?.mine ? "/mine" : "")
      );
      return data as PopulatedRoomBooking[];
    },
  });
};
