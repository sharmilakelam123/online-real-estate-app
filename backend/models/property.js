import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    location: String,
    description: String,
    bedrooms: Number,
    bathrooms: Number,
    images: [String],
    owner: String,
    category: {
      type: String,
      default: "rent",
    },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;