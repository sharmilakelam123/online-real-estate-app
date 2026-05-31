import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useState } from "react";

function Login() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login Success");
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-red-500"
        >

          <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
            Login
          </h2>

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border border-red-300 p-3 rounded mb-3 text-black focus:outline-red-500"
            onChange={handleChange}
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full border border-red-300 p-3 rounded mb-3 text-black focus:outline-red-500"
            onChange={handleChange}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-red-300 p-3 rounded mb-3 text-black focus:outline-red-500"
            onChange={handleChange}
            required
          />

          {/* ADDRESS */}
          <textarea
            name="address"
            placeholder="Full Address"
            className="w-full border border-red-300 p-3 rounded mb-4 text-black focus:outline-red-500"
            onChange={handleChange}
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 font-bold"
          >
            LOGIN
          </button>

        </form>

      </div>

      <Footer />
    </>
  );
}

export default Login;