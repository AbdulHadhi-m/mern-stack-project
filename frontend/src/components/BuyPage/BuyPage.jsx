import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

const BuyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const userStr = localStorage.getItem("loggedInUser");
  const token = userStr ? JSON.parse(userStr).token : null;

  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE}/products/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        toast.error("Product not found");
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, token]);

  const handleConfirmOrder = async () => {
    try {
      const orderData = {
        orderId: `ORD-${Date.now()}`,
        products: [
          {
            productId: product._id,
            quantity: 1,
          },
        ],
      };

      await axios.post(`${API_BASE}/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("🎉 Order placed successfully!");
      navigate("/booked");

    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-gray-600">
        Loading checkout details...
      </div>
    );

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center items-center">
      <div className="bg-white max-w-4xl w-full rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        {/* Product Image */}
        <div className="md:w-1/2 relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover min-h-[300px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <div>
              <h2 className="text-white text-2xl font-bold">
                {product.title}
              </h2>
              <p className="text-gray-200 capitalize">
                {product.category}
              </p>
            </div>
          </div>
        </div>

        {/* Checkout */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
            Confirm Your Order
          </h1>

          <div className="space-y-4 mb-8">

            <div className="flex justify-between text-gray-600">
              <span>Product</span>
              <span className="font-semibold text-gray-800">
                {product.title}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Category</span>
              <span className="capitalize bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-semibold">
                {product.category}
              </span>
            </div>

            <div className="border-t border-dashed pt-4 flex justify-between text-lg">
              <span className="font-bold text-gray-800">
                Total Amount
              </span>
              <span className="font-bold text-green-600">
                ₹{product.price.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={handleConfirmOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition hover:scale-[1.02]"
          >
            Confirm & Place Order
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full mt-4 text-gray-500 hover:text-gray-700 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;