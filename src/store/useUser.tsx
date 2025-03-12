import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { User } from "@/types";

interface UserContextType {
  user?: User;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user } = useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get("/auth/profile");
      return res?.data || {};
    },
    retry: false,
  });

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
