import { api } from "@/lib/axios";
import { CabBooking } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useCabBookingMutation = () => {
  const createCabBooking = useMutation({
    mutationFn: async (
      createData: Omit<CabBooking, "_id" | "userId" | "driverId">
    ) => {
      const res = await api.post("/cabbookings", createData);
      return res.data as CabBooking;
    },
  });
  return { createCabBooking };
};
