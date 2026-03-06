import React, { useState } from 'react';
import axios from 'axios';
import { useAdminContext } from './context/AdminContext';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

function ProductManager() {
    const { products, fetchData } = useAdminContext();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        title: '',
        price: '',
        description: '',
        image: null,
        category: 'flat'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", currentProduct.title);
        formData.append("price", currentProduct.price);
        formData.append("description", currentProduct.description);
        formData.append("category", currentProduct.category);
        if (currentProduct.image instanceof File) {
            formData.append("image", currentProduct.image);
        }

        try {
            const userToken = JSON.parse(localStorage.getItem("loggedInUser"))?.token;
            const config = { headers: { Authorization: `Bearer ${userToken}` } }; // multer handles form-data boundary automatically

            if (isEditing) {
                await axios.put(`http://localhost:3000/api/admin/product/${currentProduct._id}`, formData, config);
                toast.success("Product Updated Successfully");
            } else {
                await axios.post('http://localhost:3000/api/admin/product', formData, config);
                toast.success("Product Added Successfully");
            }
            setShowModal(false);
            setIsEditing(false);
            setCurrentProduct({ title: '', price: '', description: '', image: null, category: 'flat' });
            fetchData();
        } catch (error) {
            console.error("Error saving product:", error);
            const backendError = error.response?.data?.message || "Failed to save product";
            toast.error(backendError);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const userToken = JSON.parse(localStorage.getItem("loggedInUser"))?.token;
                await axios.delete(`http://localhost:3000/api/admin/product/${id}`, { headers: { Authorization: `Bearer ${userToken}` } });
                toast.success("Product Deleted");
                fetchData();
            } catch (error) {
                console.error("Error deleting product:", error);
                toast.error("Failed to delete product");
            }
        }
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setIsEditing(true);
        setShowModal(true);
    };

    const openAddModal = () => {
        setIsEditing(false);
        setCurrentProduct({ title: '', price: '', description: '', image: null, category: 'flat' });
        setShowModal(true);
    };

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div>
            <div className="flex justify-between mb-6">
                <div>{/* Shim for layout */}</div>
                <button onClick={openAddModal} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                    <FaPlus />
                    <span>Add New Product</span>
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {['all', 'flat', 'house', 'apartment', 'room'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product._id} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button onClick={() => handleEdit(product)} className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:text-blue-600"><FaEdit /></button>
                                    <button onClick={() => handleDelete(product._id)} className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:text-red-500"><FaTrash /></button>
                                </div>
                                <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                                    {product.category}
                                </span>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-gray-800 line-clamp-1">{product.title}</h3>
                                    <span className="font-bold text-blue-600">${product.price.toLocaleString()}</span>
                                </div>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-lg text-gray-800">{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input type="text" name="title" value={currentProduct.title || ''} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                    <input type="number" name="price" value={currentProduct.price || ''} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select name="category" value={currentProduct.category || ''} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all">
                                    <option value="flat">Flat</option>
                                    <option value="house">House</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="room">Room</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image File</label>
                                <input type="file" name="image" onChange={(e) => setCurrentProduct(prev => ({ ...prev, image: e.target.files[0] }))} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea name="description" value={currentProduct.description || ''} onChange={handleInputChange} rows="3" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" required></textarea>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors shadow-lg">
                                {isEditing ? 'Update Product' : 'Create Product'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductManager;
