import { useState } from "react";
import Navbar from "../components/common/Navbar";

function AddProperty() {
  const [form, setForm] = useState({
    title: "",
    type: "Villa",
    category: "Buy",
    price: "",
    location: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Property Data:", form);
    alert("Property Added Successfully (Frontend Only)");
  };

  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">
          Add New Property 🏡
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow p-5 rounded space-y-3"
        >
          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Property Title"
            className="border p-2 w-full"
            onChange={handleChange}
            required
          />

          {/* TYPE */}
          <select
            name="type"
            className="border p-2 w-full"
            onChange={handleChange}
          >
            <option>Villa</option>
            <option>Apartment</option>
            <option>Land</option>
            <option>Shop</option>
            <option>Farm House</option>
          </select>

          {/* CATEGORY */}
          <select
            name="category"
            className="border p-2 w-full"
            onChange={handleChange}
          >
            <option>Buy</option>
            <option>Rent</option>
          </select>

          {/* PRICE */}
          <input
            type="text"
            name="price"
            placeholder="Price (e.g. 50 Lakhs)"
            className="border p-2 w-full"
            onChange={handleChange}
            required
          />

          {/* LOCATION */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="border p-2 w-full"
            onChange={handleChange}
            required
          />

          {/* IMAGE */}
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="border p-2 w-full"
            onChange={handleChange}
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            className="border p-2 w-full"
            rows="4"
            onChange={handleChange}
          ></textarea>

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-red-500 text-white w-full p-2 rounded"
          >
            Add Property
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProperty;