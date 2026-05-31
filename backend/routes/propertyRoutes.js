import express from "express";

import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// CREATE WITH IMAGE
router.post("/", protect, upload.single("image"), createProperty);

// GET ALL
router.get("/", getProperties);

// SINGLE
router.get("/:id", getPropertyById);

// UPDATE
router.put("/:id", protect, updateProperty);

// DELETE
router.delete("/:id", protect, deleteProperty);

export default router;