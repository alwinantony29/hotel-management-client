import { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { User } from "@/types";
import { useNavigate } from "react-router";

interface UserContextType {
  user?: User;
  logout: () => void;
  isLoading: boolean;
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
    localStorage.clear();
    await queryClient.invalidateQueries({ queryKey: ["user"] });
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ user: user || undefined, logout, isLoading }}
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
