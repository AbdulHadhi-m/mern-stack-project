import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import ProductManager from './ProductManager';
import UserManager from './UserManager';
import OrderManager from './OrderManager';
import { AdminProvider } from './context/AdminContext';

function AdminPageContent() {
    const location = useLocation();

    const getHeaderInfo = () => {
        const path = location.pathname;
        if (path.includes('/products')) {
            return { title: 'Products Directory', subtitle: 'Manage products details' };
        } else if (path.includes('/users')) {
            return { title: 'Registered Users', subtitle: 'Manage users details' };
        } else if (path.includes('/orders')) {
            return { title: 'Order History', subtitle: 'View and manage orders' };
        } else {
            return { title: 'Dashboard Overview', subtitle: 'Welcome back, Admin' };
        }
    };

    const { title, subtitle } = getHeaderInfo();

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-center mb-8 sticky top-0 z-10 bg-gray-50/95 backdrop-blur-sm py-4 -mx-8 px-8 border-b border-gray-100">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                        <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
                    </div>
                </header>

                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="products" element={<ProductManager />} />
                    <Route path="users" element={<UserManager />} />
                    <Route path="orders" element={<OrderManager />} />
                </Routes>
            </main>
        </div>
    );
}

function AdminPage() {
    return (
        <AdminProvider>
            <AdminPageContent />
        </AdminProvider>
    );
}

export default AdminPage;
