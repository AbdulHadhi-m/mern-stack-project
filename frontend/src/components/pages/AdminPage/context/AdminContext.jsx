import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AdminContext = createContext();

export const useAdminContext = () => {
    return useContext(AdminContext);
};

export const AdminProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        const token = user?.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const [productsRes, usersRes, ordersRes, statsRes] = await Promise.allSettled([
              axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products`, config),
              axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`, config),
              axios.get(`${import.meta.env.VITE_API_URL}/api/admin/allOrders`, config),
              axios.get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard-stats`, config)
            ]);

            if (productsRes.status === 'fulfilled') setProducts(productsRes.value.data.products || []);
            if (usersRes.status === 'fulfilled') setUsers(usersRes.value.data.users || []);
            if (ordersRes.status === 'fulfilled') setOrders(ordersRes.value.data.orders || []);
            if (statsRes.status === 'fulfilled') setStats(statsRes.value.data.data || null);

        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to fetch dashboard data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const value = {
        products,
        users,
        orders,
        stats,
        loading,
        fetchData
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};
