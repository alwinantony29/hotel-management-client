import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useCustomerMutations = () => {
  const queryClient = useQueryClient();

  const loginCustomer = useMutation({
    mutationFn: async (loginData: { email: string; password: string }) => {
      const res = await api.post("/auth/login", loginData);
      return res.data;
    },
    onSuccess: async (data) => {
      localStorage.setItem("token", data.token);
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Welcome back!");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Login failed. Please try again.";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
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
      toast.success("Account created successfully");
    },
    onError: (error) => {
      console.error("Signup failed:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Signup failed. Please try again.";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
  });

  return { loginCustomer, createCustomer };
};
