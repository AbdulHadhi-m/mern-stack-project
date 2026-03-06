import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting Rentora! We’ll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header Section */}
      <section className="bg-green-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-3">Get in Touch</h1>
        <p className="text-green-100 text-lg">
          Have a question or need help finding your next rental property?
        </p>
      </section>

      {/* Contact Content */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Send us a message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Write your message..."
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col justify-center bg-green-50 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Contact Information
          </h2>
          <p className="text-gray-600 mb-4">
            We’re here to assist you with property listings, booking details, or
            any other inquiries. Reach out to us anytime!
          </p>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-center space-x-3">
              <span className="text-green-600 text-xl">📍</span>
              <p>123 Rentora Street, Downtown City, India</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-600 text-xl">📞</span>
              <p>+91 98765 43210</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-600 text-xl">📧</span>
              <p>support@rentora.com</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-600 text-xl">🌐</span>
              <p>www.rentora.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Optional Google Map Embed */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg">
          <iframe
            title="Rentora Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1817.805045918297!2d76.1108265502187!3d11.11908772007983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba637f0ab2380b7%3A0x475a55d6de061011!2sBridgeon!5e1!3m2!1sen!2sin!4v1762888178965!5m2!1sen!2sin" 
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center text-sm">
        © {new Date().getFullYear()} Rentora. All rights reserved.
      </footer>
    </div>
  );
}

export default Contact;
