import React,{useState} from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { FaBox, FaUsers, FaChartPie, FaFileInvoiceDollar } from 'react-icons/fa';
import toast from "react-hot-toast";
function Sidebar() {
     const [user, setUser] = useState(null);
      const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    toast.success("You have been logged out successfully.");
    navigate("/login");
  };
    return (
        <aside className="w-64 bg-white shadow-lg fixed top-0 left-0 h-full z-10 transition-transform duration-300">
            <div className="p-6 border-b border-gray-100">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Rentora Admin</h1>
            </div>
            <nav className="p-4 space-y-2">
                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) => `w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    <FaChartPie />
                    <span className="font-medium">Dashboard</span>
                </NavLink>
                <NavLink
                    to="/admin/products"
                    className={({ isActive }) => `w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    <FaBox />
                    <span className="font-medium">Property Management</span>
                </NavLink>
                <NavLink
                    to="/admin/users"
                    className={({ isActive }) => `w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    <FaUsers />
                    <span className="font-medium">User Management</span>
                </NavLink>
                <NavLink
                    to="/admin/orders"
                    className={({ isActive }) => `w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    <FaFileInvoiceDollar />
                    <span className="font-medium">Booking Details</span>
                </NavLink>

                <div className="pt-4 mt-4 border-t border-gray-100">
                         <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
                </div>
            </nav>
        </aside>
    );
}

export default Sidebar;
