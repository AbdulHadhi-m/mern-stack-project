import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const token = user?.token;

  const fetchCart = async () => {
    const res = await axios.get("http://localhost:3000/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCart(res.data);
  };

  useEffect(() => {
    if (!user) navigate("/login");
    else fetchCart();
  }, []);

  const updateQuantity = async (productId, action) => {
    await axios.put(
      `http://localhost:3000/api/cart/${productId}`,
      { action },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchCart();
  };

  const removeItem = async (productId) => {
    await axios.delete(
      `http://localhost:3000/api/cart/${productId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchCart();
  };

  const checkout = async () => {
    await axios.post(
      "http://localhost:3000/api/orders",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    navigate("/booked");
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + item.productId.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Your cart is empty 🛍️
        </h2>
        <Link
          to="/productsList"
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">
        Pre-Booking Cart
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        <div className="md:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item._id} className="bg-white rounded-3xl shadow-md p-5">
              <h2 className="text-lg font-semibold">
                {item.productId.title}
              </h2>
              <p>₹{item.productId.price}</p>

              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => updateQuantity(item.productId._id, "dec")}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  -
                </button>

                {item.quantity}

                <button
                  onClick={() => updateQuantity(item.productId._id, "inc")}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  +
                </button>

                <button
                  onClick={() => removeItem(item.productId._id)}
                  className="text-red-500 ml-6"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg h-fit">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <p>Total: ₹{total}</p>

          <button
            onClick={checkout}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl"
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
}

export default CartPage;