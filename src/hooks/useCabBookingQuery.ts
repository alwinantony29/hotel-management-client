import { api } from "@/lib/axios";
import { CabBooking } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchCabBookings = async (): Promise<CabBooking[]> => {
  const res = await api.get("/cabbookings");
  return res?.data || [];
};

export const useCabBookings = () => {
  return useQuery<CabBooking[]>({
    queryKey: ["cabBookings"],
    queryFn: fetchCabBookings,
  });
};
