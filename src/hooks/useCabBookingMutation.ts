import { api } from "@/lib/axios";
import { CabBooking } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCabBookingMutation = () => {
  const queryClient = useQueryClient();

  const createCabBooking = useMutation({
    mutationFn: async (createData: Partial<CabBooking>) => {
      const res = await api.post("/cabbookings", createData);
      return res.data as CabBooking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabBookings"] });
    },
    onError: (error) => {
      console.error("Error creating booking:", error);
    },
  });

  const updateCabBooking = useMutation({
    mutationFn: async ({
      tripId,
      updateData,
    }: {
      tripId: string;
      updateData: Partial<CabBooking>;
    }) => {
      const res = await api.patch(`/cabbookings/${tripId}`, updateData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabBookings"] });
    },
    onError: (error) => {
      console.error("Error updating booking:", error);
    },
  });

  return { createCabBooking, updateCabBooking };
};
