import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { ImHome } from "react-icons/im";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const checkUser = () => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser") || "null"
    );
    setUser(loggedInUser);
  };

  // Check login status
  useEffect(() => {
    checkUser();
    window.addEventListener("userLogin", checkUser);
    return () => window.removeEventListener("userLogin", checkUser);
  }, [location]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    toast.success("You have been logged out successfully.");
    navigate("/login");
  };

  // Hide navbar in admin pages
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="w-full flex flex-wrap bg-[#F7F6DC] items-center h-20 md:h-24 shadow-md px-4">
      
      {/* Logo */}
      <Link to="/">
        <div className="flex items-center justify-center gap-2 p-2 w-auto">
          <ImHome className="text-3xl text-green-800" />
          <h1 className="text-2xl md:text-3xl font-semibold text-[#2C3E50] tracking-wide">
            Rentora
          </h1>
        </div>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex flex-1 justify-center font-semibold text-lg space-x-8">
        <Link to="/" className="hover:text-green-500 transition">Home</Link>
        <Link to="/productsList" className="hover:text-green-500 transition">All Properties</Link>
        <Link to="/about" className="hover:text-green-500 transition">About Us</Link>
        <Link to="/contact" className="hover:text-green-500 transition">Contact</Link>
        <Link to="/Booked" className="hover:text-green-500 transition">Booked</Link>
      </div>

      {/* Profile & Cart */}
      <div className="flex items-center gap-6 ml-auto font-semibold text-lg">
        
        {user ? (
          <div className="flex items-center gap-4">

            <div className="flex items-center gap-2 text-green-700 font-semibold">
              <CgProfile className="text-2xl" />
              <span>
                Hello, {user?.username?.split(" ")[0]}
              </span>
            </div>

            {(user?.email === "Admin@example.com" || user?.role === "admin") && (
              <Link
                to="/admin"
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
              >
                Admin
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 hover:text-green-500 transition"
          >
            <CgProfile className="text-2xl" />
            <span>Login</span>
          </Link>
        )}

        <Link to="/cart" className="hover:text-green-500 transition relative">
          <FaShoppingCart className="text-2xl" />
        </Link>

      </div>
    </div>
  );
}

export default Navbar;