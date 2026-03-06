import React, { useState } from 'react';
import { FaBox, FaBan, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import { useAdminContext } from './context/AdminContext';
import { toast } from 'react-hot-toast';

function UserManager() {
    const { users, fetchData } = useAdminContext();
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserModal, setShowUserModal] = useState(false);

    const viewUser = (user) => {
        setSelectedUser(user);
        setShowUserModal(true);
    };

    const handleBlockUser = async (user) => {
        if (!window.confirm(`Are you sure you want to ${user.isBlocked ? 'unblock' : 'block'} ${user.username}?`)) return;

        try {
            const userLoggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
            const token = userLoggedIn?.token;
            await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/user/toggle/${user._id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success(`User ${user.isBlocked ? 'unblocked' : 'blocked'} successfully`);
            fetchData();
        } catch (error) {
            console.error("Error updating user status:", error);
            toast.error("Failed to update user status");
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 font-semibold text-gray-600 text-sm">User Info</th>
                        <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Email</th>
                        <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Role/Status</th>
                        <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {users.map(user => (
                        <tr key={user._id} className={`hover:bg-gray-50/50 transition-colors ${user.isBlocked ? 'bg-red-50/30' : ''}`}>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${user.isBlocked ? 'bg-red-100 text-red-600' : 'bg-gradient-to-br from-purple-100 to-blue-100 text-blue-600'}`}>
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                    <span className={`font-medium ${user.isBlocked ? 'text-red-800' : 'text-gray-800'}`}>
                                        {user.username}
                                        {user.isBlocked && <span className="ml-2 text-xs text-red-600 font-bold uppercase">(Blocked)</span>}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{user.email}</td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                                    {user.role || 'User'}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right space-x-3">
                                <button onClick={() => viewUser(user)} className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                    View Details
                                </button>
                                {user.role !== 'admin' && (
                                    <button
                                        onClick={() => handleBlockUser(user)}
                                        className={`font-medium text-sm flex items-center gap-1 inline-flex ${user.isBlocked ? 'text-green-600 hover:text-green-700' : 'text-red-600 hover:text-red-700'}`}
                                    >
                                        {user.isBlocked ? <><FaCheckCircle /> Unblock</> : <><FaBan /> Block</>}
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* User Details Modal */}
            {showUserModal && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className={`p-6 text-white ${selectedUser.isBlocked ? 'bg-gradient-to-r from-red-600 to-pink-600' : 'bg-gradient-to-r from-blue-600 to-indigo-600'}`}>
                            <h3 className="text-xl font-bold">{selectedUser.username}</h3>
                            <p className="text-blue-100 text-sm">{selectedUser.email}</p>
                            {selectedUser.isBlocked && <div className="mt-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold w-fit">ACCOUNT BLOCKED</div>}
                        </div>
                        <div className="p-6">
                            <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <FaBox className="text-blue-600" /> Order History
                            </h4>
                            <div className="space-y-3">
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-medium text-gray-800">Premium Apartment Rental</span>
                                        <span className="text-green-600 text-xs font-bold uppercase bg-green-50 px-2 py-1 rounded">Active</span>
                                    </div>
                                    <p className="text-gray-500 text-xs">Order ID: #ORD-2024-8834</p>
                                    <p className="text-gray-500 text-xs mt-1">Duration: 12 Months</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 opacity-60">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-medium text-gray-800">Maintenance Service</span>
                                        <span className="text-gray-500 text-xs font-bold uppercase bg-gray-100 px-2 py-1 rounded">Completed</span>
                                    </div>
                                    <p className="text-gray-500 text-xs">Order ID: #ORD-2023-1102</p>
                                </div>
                            </div>
                            <button onClick={() => setShowUserModal(false)} className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg transition-colors">
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserManager;
