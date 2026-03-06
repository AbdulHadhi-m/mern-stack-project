import React from 'react';
import { useAdminContext } from './context/AdminContext';
import { FaFileInvoiceDollar } from 'react-icons/fa';

function OrderManager() {
    const { orders } = useAdminContext();
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FaFileInvoiceDollar className="text-green-600" />
                    All Orders
                </h2>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                    {orders.length} Records
                </span>
            </div>

            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Order ID</th>
                        <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Customer</th>
                        <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Product</th>
                        <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Date</th>
                        <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Amount</th>
                        <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-800 text-sm">
                                    {order.orderId || order._id.slice(-6).toUpperCase()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm">
                                        <div className="font-medium text-gray-800">{order.userId?.username || 'Guest'}</div>
                                        <div className="text-gray-500 text-xs text-xs">{order.userId?.email || 'N/A'}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600 text-sm">
                                    {order.items?.map(i => i.productId?.title).join(', ') || 'N/A'}
                                </td>
                                <td className="px-6 py-4 text-gray-600 text-sm">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-800">
                                    ₹{order.totalAmount?.toLocaleString() || 0}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                                        ${order.status === 'completed' ? 'bg-green-50 text-green-600' :
                                            order.status === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                                                'bg-gray-100 text-gray-600'}`}>
                                        {order.status || 'Active'}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                No orders found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default OrderManager;
