import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import Property from "../models/Property.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();

// Real photos (Unsplash) — NOT AI images
const IMAGE_POOLS = {
  apartment: [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
  ],
  villa: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80",
  ],
  "independent-house": [
    "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1560185127-6a8c0a5fbb8a?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1600&q=80",
  ],
  plot: [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  ],
  office: [
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80",
  ],
  shop: [
    "https://images.unsplash.com/photo-1521337581100-8ca9a73a5eae?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
  ],
  "builder-floor": [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
  ],
};

const LOCATIONS = [
  { city: "Hyderabad", areas: ["Gachibowli", "Kondapur", "Kompally", "Madhapur", "Kukatpally"] },
  { city: "Bangalore", areas: ["Whitefield", "HSR Layout", "Electronic City", "Indiranagar", "Hebbal"] },
  { city: "Mumbai", areas: ["Andheri East", "Powai", "Thane", "Navi Mumbai", "Bandra"] },
  { city: "Delhi", areas: ["Dwarka", "Saket", "Rohini", "Vasant Kunj", "Noida"] },
  { city: "Chennai", areas: ["OMR", "Velachery", "Porur", "Anna Nagar", "Tambaram"] },
  { city: "Pune", areas: ["Hinjewadi", "Wakad", "Kharadi", "Baner", "Hadapsar"] },
  {
    city: "Srikakulam",
    areas: ["Etcherla", "Ragolu", "Balaga", "Ranastalam", "Narasannapeta", "Ichchapuram", "Gujarathipeta", "Arasavilli"],
  },
  {
    city: "Visakhapatnam",
    areas: ["Madhurawada", "Yendada", "Seethammadhara", "MVP Colony", "Pendurthi", "Bhogapuram", "Anandapuram", "Bheemili", "Gajuwaka"],
  },
];

const CATEGORIES = [
  { key: "apartment", label: "Apartment" },
  { key: "villa", label: "Villa" },
  { key: "independent-house", label: "Independent House" },
  { key: "plot", label: "Plot" },
  { key: "office", label: "Office" },
  { key: "shop", label: "Shop" },
  { key: "builder-floor", label: "Builder Floor" },
];

const CITY_COORDS = {
  Hyderabad: { lat: 17.385, lng: 78.4867 },
  Bangalore: { lat: 12.9716, lng: 77.5946 },
  Mumbai: { lat: 19.076, lng: 72.8777 },
  Delhi: { lat: 28.6139, lng: 77.209 },
  Chennai: { lat: 13.0827, lng: 80.2707 },
  Pune: { lat: 18.5204, lng: 73.8567 },
  Srikakulam: { lat: 18.2949, lng: 83.8938 },
  Visakhapatnam: { lat: 17.6868, lng: 83.2185 },
};

const AMENITIES = [
  "Lift",
  "Power Backup",
  "Gym",
  "Swimming Pool",
  "Security",
  "Club House",
  "Parking",
  "Garden",
  "Children Play Area",
  "CCTV",
  "Rainwater Harvesting",
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeTitle(categoryLabel, bedrooms, areaName) {
  const tags = ["Premium", "Luxury", "Spacious", "Modern", "Gated", "Ready-to-Move", "New Launch"];
  const tag = pick(tags);
  const bhk = categoryLabel === "Plot" ? "Residential Plot" : `${bedrooms} BHK`;
  return `${tag} ${bhk} ${categoryLabel} in ${areaName}`;
}

function makeDescription(areaName, city, categoryLabel) {
  return `High-demand ${categoryLabel.toLowerCase()} in ${areaName}, ${city}. Close to transit, schools, and daily needs. Good ventilation, security, and parking. Ideal for families and investors.`;
}

function jitterCoord(base, amount = 0.08) {
  return base + (Math.random() - 0.5) * amount;
}

async function seed({ count = 120, wipe = true } = {}) {
  if (!process.env.MONGO_URI) {
    throw new Error("Missing MONGO_URI in backend/.env");
  }

  await mongoose.connect(process.env.MONGO_URI);

  if (wipe) {
    await Property.deleteMany({});
  }

  const docs = Array.from({ length: count }).map(() => {
    const loc = pick(LOCATIONS);
    const areaName = pick(loc.areas);
    const cat = pick(CATEGORIES);

    const bedrooms = cat.key === "plot" ? 0 : randInt(1, 5);
    const bathrooms = bedrooms === 0 ? 0 : Math.max(1, Math.min(5, bedrooms + randInt(0, 2)));

    const sqft = cat.key === "plot" ? randInt(1200, 6000) : randInt(650, 4200);
    const price =
      cat.key === "plot"
        ? randInt(35, 150) * 100000
        : randInt(55, 600) * 100000;

    const listingType = Math.random() < 0.28 ? "rent" : "sale";
    const finalPrice =
      listingType === "rent"
        ? randInt(12, 120) * 1000 // monthly rent
        : price;

    const city = loc.city;
    const base = CITY_COORDS[city] || { lat: 20.5937, lng: 78.9629 };
    const coords = { lat: jitterCoord(base.lat), lng: jitterCoord(base.lng) };

    const verified = Math.random() < 0.55;
    const featured = Math.random() < 0.12;
    const furnishing = pick(["unfurnished", "semi-furnished", "fully-furnished"]);
    const amenities = Array.from(new Set(Array.from({ length: randInt(4, 8) }).map(() => pick(AMENITIES))));

    const pool = IMAGE_POOLS[cat.key] || IMAGE_POOLS.apartment;
    const primary = pick(pool);
    const gallery = Array.from(new Set([primary, pick(pool), pick(pool), pick(pool)]));

    const advertiserType = pick(["owner", "owner", "owner", "dealer", "builder"]);

    return {
      title: makeTitle(cat.label, bedrooms || randInt(1, 4), areaName),
      description: makeDescription(areaName, loc.city, cat.label),
      listingType,
      price: finalPrice,
      location: `${areaName}, ${loc.city}`,
      city,
      locality: areaName,
      coordinates: coords,
      image: primary,
      images: gallery,
      bedrooms: bedrooms || randInt(1, 4),
      bathrooms,
      areaSqft: sqft,
      area: `${sqft} sqft`,
      category: cat.key,
      verified,
      featured,
      furnishing,
      parking: randInt(0, 2),
      amenities,
      reraId: verified ? `RERA-${randInt(100000, 999999)}` : "",
      advertiserType,
    };
  });

  const inserted = await Property.insertMany(docs);
  console.log(`Seeded ${inserted.length} properties.`);

  await mongoose.disconnect();
}

const args = process.argv.slice(2);
const countArg = args.find((a) => a.startsWith("--count="));
const wipe = !args.includes("--no-wipe");
const count = countArg ? Number(countArg.split("=")[1]) : 120;

seed({ count, wipe }).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

