import { api } from "@/lib/axios";
import { User } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDriverMutations = () => {
  const queryClient = useQueryClient();
  const addDriverMutation = useMutation({
    mutationFn: async (createData: Omit<User, "_id">) => {
      const res = await api.post("/users", createData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
  });

  const editDriverMutation = useMutation({
    mutationFn: async (updateData: Partial<User> & { _id: string }) => {
      const res = await api.put(`/users/${updateData._id}`, updateData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
  });

  const deleteDriverMutation = useMutation({
    mutationFn: async (driverId: string) => {
      const res = await api.delete(`/users/${driverId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
  });

  return { addDriverMutation, editDriverMutation, deleteDriverMutation };
};
