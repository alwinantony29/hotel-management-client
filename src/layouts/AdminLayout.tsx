import { ReactNode } from "react";
import AdminNavbar from "@/components/admin/AdminNavbar";

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <>
            <AdminNavbar />
            {children}
        </>
    );
};

export default AdminLayout;
