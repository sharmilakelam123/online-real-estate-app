import Navbar from "../components/common/Navbar";

function PropertyDetails() {
  const property = {
    title: "Luxury 3BHK Villa",
    location: "Jayanagar, Bangalore",
    price: "2.5 Cr",
    type: "Villa",
    status: "Ready to Move",
    area: "1800 sqft",
    bedrooms: "3 BHK",
    bathrooms: "3 Bath",
    furnishing: "Semi-Furnished",
    phone: "919876543210",

    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",

    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    ],
  };

  return (
    <>
      <Navbar />

      {/* TOP BANNER */}
      <div className="bg-blue-600 text-white text-center py-3 font-semibold">
        🔥 Premium Property | Free Site Visit Available
      </div>

      {/* MAIN SECTION */}
      <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-8">

        {/* LEFT SIDE */}
        <div>
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
          />

          {/* GALLERY */}
          <div className="grid grid-cols-4 gap-3 mt-4">
            {property.gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                className="h-24 w-full object-cover rounded-lg cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>

          {/* QUICK STATS */}
          <div className="grid grid-cols-3 gap-3 mt-5">

            <div className="shadow-md p-4 rounded-xl text-center">
              <p className="font-bold text-lg">
                {property.bedrooms}
              </p>
              <p className="text-gray-500 text-sm">
                Bedrooms
              </p>
            </div>

            <div className="shadow-md p-4 rounded-xl text-center">
              <p className="font-bold text-lg">
                {property.bathrooms}
              </p>
              <p className="text-gray-500 text-sm">
                Bathrooms
              </p>
            </div>

            <div className="shadow-md p-4 rounded-xl text-center">
              <p className="font-bold text-lg">
                {property.area}
              </p>
              <p className="text-gray-500 text-sm">
                Area
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">

          <h1 className="text-4xl font-bold">
            {property.title}
          </h1>

          <p className="text-gray-600 text-lg">
            📍 {property.location}
          </p>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
            {property.status}
          </span>

          <div className="space-y-2 pt-2">
            <p>
              Property Type: <b>{property.type}</b>
            </p>

            <p>
              Furnishing: <b>{property.furnishing}</b>
            </p>

            <p>
              Area: <b>{property.area}</b>
            </p>
          </div>

          <h2 className="text-4xl text-red-500 font-bold">
            ₹ {property.price}
          </h2>

          {/* ACTION BUTTONS */}
          <div className="space-y-3 pt-4">

            <a
              href={`https://wa.me/${property.phone}`}
              target="_blank"
              rel="noreferrer"
              className="block text-center bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold"
            >
              💬 Chat on WhatsApp
            </a>

            <a
              href={`tel:${property.phone}`}
              className="block text-center bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold"
            >
              📞 Call Owner
            </a>

            <a
              href="https://maps.google.com/?q=Bangalore"
              target="_blank"
              rel="noreferrer"
              className="block text-center bg-gray-800 hover:bg-black text-white py-3 rounded-xl font-semibold"
            >
              📍 View on Map
            </a>

          </div>

          {/* PROPERTY SCORE */}
          <div className="border rounded-xl p-4 mt-6">
            <h3 className="font-bold text-lg mb-3">
              Property Score ⭐
            </h3>

            <p>Location ⭐⭐⭐⭐⭐</p>
            <p>Amenities ⭐⭐⭐⭐</p>
            <p>Connectivity ⭐⭐⭐⭐⭐</p>
            <p>Value for Money ⭐⭐⭐⭐</p>
          </div>

        </div>
      </div>

      {/* PROPERTY HIGHLIGHTS */}
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-5">
          Property Highlights 🏡
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <div className="shadow-md p-4 rounded-xl">
            <p className="font-bold">3 BHK</p>
            <p className="text-gray-500 text-sm">
              Spacious Bedrooms
            </p>
          </div>

          <div className="shadow-md p-4 rounded-xl">
            <p className="font-bold">Modern Kitchen</p>
            <p className="text-gray-500 text-sm">
              Fully Equipped
            </p>
          </div>

          <div className="shadow-md p-4 rounded-xl">
            <p className="font-bold">Parking</p>
            <p className="text-gray-500 text-sm">
              2 Cars
            </p>
          </div>

          <div className="shadow-md p-4 rounded-xl">
            <p className="font-bold">Security</p>
            <p className="text-gray-500 text-sm">
              24/7 CCTV
            </p>
          </div>

        </div>
      </div>

      {/* AMENITIES */}
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-5">
          Amenities ✨
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="shadow-md p-4 rounded-xl text-center">
            🏊 Swimming Pool
          </div>

          <div className="shadow-md p-4 rounded-xl text-center">
            🏋 Gym
          </div>

          <div className="shadow-md p-4 rounded-xl text-center">
            🚗 Parking
          </div>

          <div className="shadow-md p-4 rounded-xl text-center">
            🛡 Security
          </div>

          <div className="shadow-md p-4 rounded-xl text-center">
            ⚡ Power Backup
          </div>

          <div className="shadow-md p-4 rounded-xl text-center">
            🌳 Garden
          </div>

          <div className="shadow-md p-4 rounded-xl text-center">
            🛗 Lift
          </div>

          <div className="shadow-md p-4 rounded-xl text-center">
            🎾 Sports Area
          </div>

        </div>
      </div>

      {/* ABOUT PROPERTY */}
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">
          About Property
        </h2>

        <p className="text-gray-600 leading-8">
          Luxury 3BHK Villa located in Jayanagar,
          Bangalore. This premium villa offers spacious
          bedrooms, modular kitchen, private parking,
          landscaped garden and modern interiors.
          Perfect for families looking for comfort,
          luxury and connectivity.
        </p>
      </div>

      {/* OWNER DETAILS */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="shadow-lg border rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            Owner Details
          </h2>

          <p>👤 Rajesh Kumar</p>
          <p>📞 +91 9876543210</p>
          <p>⭐ Verified Owner</p>

          <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl">
            Chat Owner
          </button>

        </div>
      </div>

      {/* SIMILAR PROPERTIES */}
      <div className="max-w-7xl mx-auto p-6 mb-10">

        <h2 className="text-2xl font-bold mb-5">
          Similar Properties
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="shadow-lg rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
                alt=""
                className="h-56 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold text-lg">
                  Luxury Villa
                </h3>

                <p className="text-gray-500">
                  Bangalore
                </p>

                <p className="text-red-500 font-bold mt-2">
                  ₹2.1 Cr
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}

export default PropertyDetails;