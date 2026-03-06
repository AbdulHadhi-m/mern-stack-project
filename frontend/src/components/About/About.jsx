import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header Section */}
      <section className="relative bg-green-600 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-100">
            Welcome to Rentora
          </h1>
          <p className="text-lg md:text-xl text-amber-100">
            Your trusted partner in finding the perfect rental property — fast,  
            easy, and reliable.
          </p>
        </div>
        {/* <div className="absolute inset-0 bg-gradient-to-b from-green-600/90 to-green-700/90 opacity-70"></div> */}
      </section>
                    
      {/* About Description */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Who We Are
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Rentora is a modern rental marketplace built to connect people with
            the best available houses, apartments, and commercial spaces.  
            We’re driven by a mission to simplify renting — making it transparent,
            fast, and enjoyable for both owners and tenants.  
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="text-green-600 text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold mb-2">Wide Range of Listings</h3>
            <p className="text-gray-600 text-sm">
              From cozy apartments to luxury villas, Rentora brings you a vast
              selection of verified rental properties.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="text-green-600 text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Seamless Experience</h3>
            <p className="text-gray-600 text-sm">
              Browse, compare, and connect with property owners — all in just a
              few clicks, without any hassle.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="text-green-600 text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">Trusted Community</h3>
            <p className="text-gray-600 text-sm">
              Every listing is verified, and every transaction is secure, ensuring
              complete peace of mind for our users.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-green-50 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-10">
            To redefine the rental experience by using smart technology, verified
            data, and customer-first design — helping people find their dream homes
            without stress.
          </p>
          <img
            src="https://i.pinimg.com/1200x/66/a6/b7/66a6b7f97b5ee87c46d58882f658a806.jpg"
            alt="modern building"
            className="rounded-3xl shadow-lg w-full max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-green-600 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Looking for your next rental property?
        </h2>
        <p className="text-green-100 mb-6">
          Join Rentora today and discover a smarter way to rent homes and buildings.
        </p>
        <a
          href="/productsList"
          className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition"
        >
          Explore Properties
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center text-sm">
        © {new Date().getFullYear()} Rentora. All rights reserved.
      </footer>
    </div>
  );
}

export default About;
