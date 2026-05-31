import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import SearchBar from "../components/home/SearchBar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section
        className="h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600')",
        }}
      >
        <div className="bg-black/60 p-10 rounded-xl text-center w-full max-w-3xl">

          <h1 className="text-5xl text-white font-bold mb-4">
            Find Your Dream Home
          </h1>

          <p className="text-white mb-6 text-lg">
            Buy • Sell • Rent Properties Easily
          </p>

          <SearchBar />

        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="p-10 bg-gray-100">

        <h2 className="text-3xl font-bold mb-8 text-black">
          Featured Properties
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {/* CARD 1 */}
          <Link to="/property/1">
            <div className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600"
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="font-bold mt-3">Luxury Villa</h3>
              <p>Hyderabad</p>
              <p className="text-red-500 font-bold">₹ 1.5 Cr</p>
            </div>
          </Link>

          {/* CARD 2 */}
          <Link to="/property/2">
            <div className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600"
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="font-bold mt-3">Modern Apartment</h3>
              <p>Bangalore</p>
              <p className="text-red-500 font-bold">₹ 95 Lakhs</p>
            </div>
          </Link>

          {/* CARD 3 */}
          <Link to="/property/3">
            <div className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600"
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="font-bold mt-3">Premium House</h3>
              <p>Vizag</p>
              <p className="text-red-500 font-bold">₹ 1.1 Cr</p>
            </div>
          </Link>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;