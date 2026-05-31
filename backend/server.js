import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";

// ROUTES
import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// DNS FIX (MongoDB Atlas connection issue fix)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// ENV CONFIG
dotenv.config();

// APP
const app = express();

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/user", userRoutes);

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Nestora Backend Running 🚀");
});

// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected Successfully ✅");
  })
  .catch((err) => {
    console.log("DB ERROR ❌", err.message);
  });

// PORT
const PORT = process.env.PORT || 5000;

// SERVER START
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});