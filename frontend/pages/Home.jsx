import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/properties")
      .then((res) => setProperties(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-10 grid grid-cols-3 gap-5">

      {properties.map((item) => (
        <div key={item._id} className="border rounded-xl p-4 shadow">

          <img
            src={item.images?.[0]}
            className="h-40 w-full object-cover rounded"
          />

          <h2 className="text-xl font-bold mt-2">
            {item.title}
          </h2>

          <p>{item.location}</p>

          <p className="text-blue-600 font-bold">
            ₹{item.price}
          </p>

        </div>
      ))}

    </div>
  );
};

export default Home;