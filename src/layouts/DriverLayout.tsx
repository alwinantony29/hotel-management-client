import { ReactNode, useEffect } from "react";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { isAuthenticated } from "@/lib/utils";
import { useNavigate } from "react-router";
import { useUser } from "@/store/useUser";

interface DriverLayoutProps {
  children: ReactNode;
}

const DriverLayout: React.FC<DriverLayoutProps> = ({ children }) => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated() || !user || user.role !== "driver") {
      navigate("/login");
    }
  }, [navigate, user, isLoading]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <AdminNavbar title="Driver" />
      {children}
    </>
  );
};

export default DriverLayout;
