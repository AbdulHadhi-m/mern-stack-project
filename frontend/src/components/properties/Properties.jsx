import React from 'react';

function Properties() {
  const categories = [
    {
      id: 1,
      name: "Flat",
      imagePath: "https://i.pinimg.com/736x/35/55/82/355582a7effdf774106403821122efa9.jpg",
      description: "Modern flats located in urban areas with great amenities."
    },
    {
      id: 2,
      name: "House",
      imagePath: "https://i.pinimg.com/736x/ec/d5/96/ecd596d29e88c7613beedd309d7cc38a.jpg",
      description: "Spacious houses perfect for families with gardens and garages."
    },
    {
      id: 3,
      name: "Apartment",
      imagePath: "https://i.pinimg.com/736x/97/ed/1b/97ed1ba8d578687b951f6a08c23ec3ca.jpg",
      description: "Compact and stylish apartments suited for professionals and students."
    },
    {
      id: 4,
      name: "Room",
      imagePath: "https://i.pinimg.com/1200x/ba/ad/f2/baadf2b991e04a9ff29a134964ca6d45.jpg",
      description: "Affordable rooms available for rent in shared buildings or dorms."
    },
  ];

  return (
    <div className="px-[8%] py-10 bg-white h-50vh">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Property Categories
      </h1>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            {/* Image */}
            <div className="w-full h-48 overflow-hidden">
              <img
                src={cat.imagePath}
                alt={cat.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Info */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{cat.name}</h2>
              <p className="text-sm text-gray-600 mt-2">{cat.description}</p>
              <button className="mt-4 px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-green-400 transition-colors">
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Properties;
