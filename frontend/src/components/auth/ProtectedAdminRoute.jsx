import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProtectedAdminRoute = ({ children }) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        toast.error("Please login to access this page");
        return <Navigate to="/login" replace />;
    }

    const isAdmin = loggedInUser.role === 'admin' || loggedInUser.email === 'Admin@example.com';

    if (!isAdmin) {
        toast.error("Access denied. Admin privileges required.");
        return <Navigate to="/" replace />;
    }

    // If children is provided (when used as a wrapper), use it. 
    // Otherwise use Outlet for nested routes (if authorized).
    return children ? children : <Outlet />;
};

export default ProtectedAdminRoute;
