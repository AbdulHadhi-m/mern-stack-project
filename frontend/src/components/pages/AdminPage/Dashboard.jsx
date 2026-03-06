import { useAdminContext } from './context/AdminContext';
import { FaBox, FaUsers, FaFileInvoiceDollar } from 'react-icons/fa';

function Dashboard() {
    const { stats, loading } = useAdminContext();

    if (loading || !stats) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const { totalProducts, totalUsers, totalOrders, totalValue, categoryStats } = stats;

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-xl text-2xl">
                        <FaBox />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Properties</p>
                        <h3 className="text-2xl font-bold text-gray-800">{totalProducts}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="p-4 bg-purple-50 text-purple-600 rounded-xl text-2xl">
                        <FaUsers />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Users</p>
                        <h3 className="text-2xl font-bold text-gray-800">{totalUsers}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="p-4 bg-yellow-50 text-yellow-600 rounded-xl text-2xl">
                        <FaFileInvoiceDollar />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Bookings</p>
                        <h3 className="text-2xl font-bold text-gray-800">{totalOrders}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="p-4 bg-green-50 text-green-600 rounded-xl text-2xl">
                        <span className="font-bold">$</span>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Property Value</p>
                        <h3 className="text-2xl font-bold text-gray-800">${totalValue.toLocaleString()}</h3>
                    </div>
                </div>
            </div>

            {/* Category Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Inventory Breakdown</h3>
                    <div className="space-y-4">
                        {Object.entries(categoryStats).map(([cat, count]) => (
                            <div key={cat} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="capitalize font-medium text-gray-700">{cat}</span>
                                <span className="bg-white px-3 py-1 rounded-md shadow-sm text-sm font-bold text-gray-600">{count}</span>
                            </div>
                        ))}
                        {Object.keys(categoryStats).length === 0 && (
                            <p className="text-gray-400 text-center py-4">No data available</p>
                        )}
                    </div>
                </div> */}
                {/* <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Recent System Notices</h3>
                    <div className="space-y-4">
                        <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                            <p className="text-sm font-medium text-blue-900">System Update</p>
                            <p className="text-xs text-blue-700 mt-1">Dashboard features have been successfully deployed.</p>
                        </div>
                        <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                            <p className="text-sm font-medium text-green-900">Database Status</p>
                            <p className="text-xs text-green-700 mt-1">Connection to json-server is active and healthy.</p>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Dashboard;
