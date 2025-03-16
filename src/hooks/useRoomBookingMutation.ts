import { api } from "@/lib/axios";
import { RoomBooking } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useRoomBookingMutation = () => {
  const createRoomBookingMutation = useMutation({
    mutationFn: (
      roomBooking: Omit<
        RoomBooking,
        "_id" | "userId" | "totalPrice" | "createdAt"
      >
    ) => {
      return api.post("/roombookings", roomBooking);
    },
  });

  return { createRoomBookingMutation };
};
