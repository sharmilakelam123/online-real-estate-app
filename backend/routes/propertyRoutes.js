import express from "express";
import Property from "../models/Property.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const data = await Property.create(req.body);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});


router.get("/", async (req, res) => {
  try {
    const data = await Property.find();
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

export default router;