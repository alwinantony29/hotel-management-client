import { api } from "@/lib/axios";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchDrivers = async () => {
  const res = await api.get("/users", {
    params: { role: "driver" },
  });
  return res?.data || [];
};

export const useDrivers = () => {
  return useQuery<User[]>({
    queryKey: ["drivers"],
    queryFn: fetchDrivers,
  });
};
