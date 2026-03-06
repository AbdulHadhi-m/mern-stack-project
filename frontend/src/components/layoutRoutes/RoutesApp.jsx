import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Home from '../pages/Home';
import ProductsList from '../ProductsList/ProductsList';
import ProductDetails from '../ProductDetails/ProductDetails';
import BuyPage from '../BuyPage/BuyPage';
import CartPage from '../CartApp/CartPage';
import About from '../About/About';
import Contact from '../Contact/Contact';
import Signup from '../logANDSig/Signup';
import Login from '../logANDSig/Login';
import Booked from '../CartApp/Booked';
import AdminPage from '../pages/AdminPage';
import ProtectedAdminRoute from '../auth/ProtectedAdminRoute';


function RoutesApp() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productsList" element={<ProductsList />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/buy/:id" element={<BuyPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booked" element={<Booked />} />
        <Route path="/admin/*" element={
          <ProtectedAdminRoute>
            <AdminPage />
          </ProtectedAdminRoute>
        } />
      </Routes>
    </Router>
  );
}

export default RoutesApp;
