import Property from "../models/Property.js";
import cloudinary from "../config/cloudinary.js";

// CREATE PROPERTY (WITH IMAGE UPLOAD)
export const createProperty = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "properties" },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ message: error.message });
          }

          imageUrl = result.secure_url;

          const property = await Property.create({
            ...req.body,
            image: imageUrl,
            user: req.user._id,
          });

          res.json(property);
        }
      );

      stream.end(req.file.buffer);
    } else {
      const property = await Property.create({
        ...req.body,
        user: req.user._id,
      });

      res.json(property);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PROPERTIES
export const getProperties = async (req, res) => {
  const data = await Property.find();
  res.json(data);
};

// GET SINGLE
export const getPropertyById = async (req, res) => {
  const data = await Property.findById(req.params.id);

  if (!data) return res.json({ message: "Not found" });

  res.json(data);
};

// UPDATE
export const updateProperty = async (req, res) => {
  const data = await Property.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(data);
};

// DELETE
export const deleteProperty = async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);

  res.json({ message: "Deleted" });
};