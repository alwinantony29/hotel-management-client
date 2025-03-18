import { ReactNode, useEffect } from "react";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { isAuthenticated } from "@/lib/utils";
import { useNavigate } from "react-router";
import { useUser } from "@/store/useUser";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const { user } = useUser()
    
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated() || !user)  navigate("/login");
    if(user?.role != 'admin')  navigate("/login");
  }, [navigate, user]);

  return (
    <>
      <AdminNavbar />
      {children}
    </>
  );
};

export default AdminLayout;
