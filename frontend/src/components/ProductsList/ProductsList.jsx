import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);   
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading products...
      </div>
    );
  }

  const filteredProducts = products.filter((product) =>
    product?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
                                                                                                  
      {/* Search */}
      <div className="flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-10 border-2 border-green-500 rounded-lg p-2 w-full max-w-md focus:outline-none focus:ring-4 focus:ring-green-200"
          placeholder="Search..."
        />
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link
              key={product._id}
              to={`/product-details/${product._id}`}
              className="group"
            >
              <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:scale-[1.03] hover:shadow-2xl transition">

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-green-600 transition">
                    {product.title}
                  </h2>

                  <p className="text-gray-700 text-sm line-clamp-2 mb-4">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-green-600">
                      ₹{product.price?.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-400 group-hover:text-green-500 transition">
                      View Details →
                    </span>
                  </div>

                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No products found.
        </p>
      )}
    </div>
  );
};

export default ProductsList;