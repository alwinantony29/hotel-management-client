import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { User } from "@/types";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface UserContextType {
  user?: User;
  logout: () => void;
  isLoading: boolean;
  changePassword: (data: ChangePasswordInput) => Promise<void>;
}

interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<User | null> => {
      try {
        const res = await api.get("/auth/profile");
        return res?.data || {};
      } catch {
        return null;
      }
    },
    retry: false,
  });

  const logout = async () => {
    console.log('logout');    
    localStorage.clear();
    await queryClient.invalidateQueries({ queryKey: ["user"] });
    navigate("/");
  };

  const { mutateAsync: changePassword } = useMutation({
    mutationFn: async (formData: ChangePasswordInput) => {
      const res = await api.patch("/users/change-password", formData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Password changed successfully!");
      const redirectPath = user?.role === "customer" ? "" : user?.role;
      setTimeout(() => navigate(`/${redirectPath}`), 500);
    },
    onError: (error: AxiosError<{ error?: string }>) => {
      const errorMessage =
        error.response?.data?.error || "Failed to change password";
      toast.error(errorMessage);
    },
  });

  return (
    <UserContext.Provider
      value={{ user: user || undefined, logout, isLoading, changePassword }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
