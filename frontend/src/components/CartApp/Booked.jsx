import React, { useEffect, useState } from "react";
import axios from "axios";

function Booked() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const token = user?.token;

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-8">
        Your Booked Properties 🏠
      </h1>

      {orders.length === 0 && <p>No bookings yet.</p>}

      {orders.map((order) => (
        <div key={order._id} className="bg-white p-6 mb-6 rounded-xl shadow">
          <p className="font-semibold">Total: ₹{order.totalAmount}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Booked;