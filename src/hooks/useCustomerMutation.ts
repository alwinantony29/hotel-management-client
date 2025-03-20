import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCustomerMutations = () => {
  const queryClient = useQueryClient();

  const loginCustomer = useMutation({
    mutationFn: async (loginData: { email: string; password: string }) => {
      const res = await api.post("/auth/login", loginData);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const createCustomer = useMutation({
    mutationFn: async (createData: {
      name: string;
      email: string;
      password: string;
    }) => {
      const res = await api.post("/auth/signup", createData);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Signup failed:", error);
    },
  });

  return { loginCustomer, createCustomer };
};
