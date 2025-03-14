import { api } from "@/lib/axios";
import { Room } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRoomMutations = () => {
  const queryClient = useQueryClient();

  const addRoomMutation = useMutation({
    mutationFn: async (room: Omit<Room, "_id">) => {
      const res = await api.post("/rooms", room);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (error) => {
      console.error("Error adding room:", error);
    },
  });

  const editRoomMutation = useMutation({
    mutationFn: async ({ _id, ...rest }: Room) => {
      const res = await api.put(`/rooms/${_id}`, rest);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (error) => {
      console.error("Error editing room:", error);
    },
  });
  return { addRoomMutation, editRoomMutation };
};
