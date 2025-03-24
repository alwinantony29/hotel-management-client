import { useUser } from "@/store/useUser";
import { User } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminNavbar = ({ title }: { title: string }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const role = user?.role;

  // Extracting the active route from the URL
  const activeRoute = location.pathname.split("/")[2] || "rooms";

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="text-xl font-bold">{title}</div>

        {/* Navigation Routes */}
        <div className="flex items-center space-x-8">
          {role == "admin" && (
            <div className="flex space-x-6">
              <button
                className={`cursor-pointer py-2 px-1 border-b-2 ${
                  activeRoute === "bookings"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent hover:text-gray-300"
                }`}
                onClick={() => navigate("/admin/bookings")}
              >
                Bookings
              </button>
              <button
                className={`cursor-pointer py-2 px-1 border-b-2 ${
                  activeRoute === "rooms"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent hover:text-gray-300"
                }`}
                onClick={() => navigate("/admin/rooms")}
              >
                Rooms
              </button>
              <button
                className={`cursor-pointer py-2 px-1 border-b-2 ${
                  activeRoute === "drivers"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent hover:text-gray-300"
                }`}
                onClick={() => navigate("/admin/drivers")}
              >
                Drivers
              </button>
            </div>
          )}

          {/* Profile Icon with Dropdown */}
          <div className="relative">
            <button
              className="cursor-pointer p-2 rounded-full hover:bg-gray-700 focus:outline-none"
              onClick={toggleDropdown}
            >
              <User size={24} />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <button
                  className="cursor-pointer block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => navigate("/change-password")}
                >
                  change password
                </button>
                <button
                  className="cursor-pointer block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
