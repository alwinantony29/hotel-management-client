import { api } from "@/lib/axios";
import { Room } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchRooms = async ({ status }: { status?: Room["status"] }) => {
  const res = await api.get("/rooms", { params: { status } });
  return res?.data || [];
};

export const useRooms = (args?: { status?: Room["status"] }) => {
  const { status } = args || {};
  return useQuery<Room[]>({
    queryKey: ["rooms"],
    queryFn: () => fetchRooms({ status }),
  });
};
