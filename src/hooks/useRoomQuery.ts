import { api } from "@/lib/axios";
import { Room } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchRooms = async () => {
  const res = await api.get("/rooms");
  return res?.data || [];
};

export const useRooms = () => {
  return useQuery<Room[]>({
    queryKey: ["rooms"],
    queryFn: fetchRooms,
  });
};
