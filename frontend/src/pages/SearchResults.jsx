import React, { useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PropertyCard from "../components/property/PropertyCard";
import { saveRecentlySearched } from "../utils/activity";

function SearchResults() {
  const location = useLocation();
  const properties = useSelector((state) => state.properties.items);

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  useEffect(() => {
    saveRecentlySearched(searchQuery);
  }, [searchQuery]);

  const filteredProperties = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return properties;
    return properties.filter((p) => {
      const title = String(p?.title || "").toLowerCase();
      const loc = String(p?.location || "").toLowerCase();
      return title.includes(q) || loc.includes(q);
    });
  }, [properties, searchQuery]);

  return (
    <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: "800", margin: 0 }}>Search Results</h1>
          <p style={{ margin: "6px 0 0 0", color: "#64748b" }}>
            Showing results for <strong>{searchQuery || "All"}</strong>
          </p>
        </div>
        <Link to="/properties" style={{ color: "#0054a6", fontWeight: "700", textDecoration: "none" }}>
          Browse all
        </Link>
      </div>

      {filteredProperties.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px", marginTop: "22px" }}>
          {filteredProperties.map((property) => (
            <PropertyCard key={property._id || property.id} property={property} />
          ))}
        </div>
      ) : (
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "22px", marginTop: "24px" }}>
          <h2 style={{ margin: 0 }}>No properties found</h2>
          <p style={{ color: "#64748b", margin: "10px 0 0 0" }}>Try another city/area name.</p>
        </div>
      )}
    </div>
  );
}

export default SearchResults;