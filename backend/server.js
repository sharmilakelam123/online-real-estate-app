import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Server Running");
});

// routes (property routes later add chestam)
import propertyRoutes from "./routes/propertyRoutes.js";
app.use("/api/properties", propertyRoutes);

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// server listen
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});