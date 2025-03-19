import { api } from "@/lib/axios";
import { RoomBooking } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useRoomBookingMutation = () => {
  const createRoomBookingMutation = useMutation({
    mutationFn: async (
      roomBooking: Omit<
        RoomBooking,
        "_id" | "userId" | "totalPrice" | "createdAt" | "cabId"
      >
    ) => {
      const res = await api.post("/roombookings", roomBooking);
      return res.data as RoomBooking;
    },
  });
  const updateRoomBookingMutation = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Omit<RoomBooking, "_id" | "userId" | "createdAt">>;
    }) => {
      const res = await api.patch("/roombookings/" + id, updates);
      return res.data as RoomBooking;
    },
  });

  return { createRoomBookingMutation, updateRoomBookingMutation };
};
