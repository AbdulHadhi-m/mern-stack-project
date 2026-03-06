import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const API_BASE = "http://localhost:3000/api/products";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch Single Product From Real Backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE}/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        console.error(error);
        toast.error("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 🛒 Add To Cart
  const handleAddToCart = async () => {
    try {
      const userStr = localStorage.getItem("loggedInUser");
      if (!userStr) {
        toast.error("Please login to add to cart");
        return;
      }
      const token = JSON.parse(userStr).token;

      await axios.post(
        "http://localhost:3000/api/cart",
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("🛒 Added to cart!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading product details...
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row">

        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            {product.title}
          </h2>

          <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">
            {product.category}
          </p>

          <p className="text-gray-700 mb-6">
            {product.description}
          </p>

          <div className="text-3xl font-semibold text-green-600 mb-6">
            ₹{product.price.toLocaleString()}
          </div>

          <div className="flex gap-4">

            <Link to={`/buy/${product._id}`}>
              <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition">
                Buy Now
              </button>
            </Link>

            <button
              onClick={handleAddToCart}
              className="border border-green-600 text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition"
            >
              Add to Cart
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;