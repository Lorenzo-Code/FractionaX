import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/600x400?text=No+Image";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/investments/${id}`);
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

        const data = await response.json();
        setProperty(data);
      } catch (error) {
        setError("Failed to load property details");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) return <div className="text-center text-blue-400">Loading property details...</div>;
  if (error) return <div className="text-center text-red-400">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-blue-400 text-center">{property.formattedAddress || "Property Details"}</h1>

      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-6 shadow-md mt-6">
        <img
          src={property.photo || PLACEHOLDER_IMAGE}
          alt={property.formattedAddress || "Property Image"}
          className="w-full h-64 object-cover rounded"
        />

        <p className="text-lg text-gray-300 mt-4">Type: {property.propertyType}</p>
        <p className="text-lg text-gray-300">Location: {property.city}, {property.state}</p>

        {property.bedrooms && <p className="text-lg text-gray-300">Bedrooms: {property.bedrooms}</p>}
        {property.bathrooms && <p className="text-lg text-gray-300">Bathrooms: {property.bathrooms}</p>}
        {property.squareFootage && <p className="text-lg text-gray-300">Size: {property.squareFootage} sqft</p>}

        {/* ✅ Display Additional Details */}
        {property.features && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-blue-400">Property Features</h2>
            <ul className="text-gray-300 mt-2">
              {property.features.garage && <li>✅ Garage: {property.features.garageType}</li>}
              {property.features.heating && <li>✅ Heating: {property.features.heatingType}</li>}
              {property.features.floorCount && <li>✅ Floors: {property.features.floorCount}</li>}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetailPage;
