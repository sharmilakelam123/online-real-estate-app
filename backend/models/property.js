import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    location: String,

    image: String, // cloudinary URL

    bedrooms: Number,
    bathrooms: Number,
    area: String,

    category: {
      type: String,
      default: "apartment",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;