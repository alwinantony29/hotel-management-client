import AdminLayout from "@/layouts/AdminLayout";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/admin/rooms`);
  }, [navigate]);

  return <AdminLayout>admin</AdminLayout>;
};

export default Admin;
