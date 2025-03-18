import { ReactNode, useEffect } from "react";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { isAuthenticated } from "@/lib/utils";
import { useNavigate } from "react-router";
import { useUser } from "@/store/useUser";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return; // Wait for user data to load
    if (!isAuthenticated() || !user || user.role !== "admin") {
      navigate("/login");
    }
  }, [navigate, user, isLoading]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <AdminNavbar />
      {children}
    </>
  );
};

export default AdminLayout;
