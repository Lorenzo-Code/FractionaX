import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AssetDetails = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    const fetchAsset = async () => {
      const response = await fetch(`/api/assets/${id}/`);
      const data = await response.json();
      setAsset(data);
    };

    fetchAsset();
  }, [id]);

  if (!asset) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{asset.name}</h2>
      <p>{asset.description}</p>
      <p>Price: {asset.price}</p>
    </div>
  );
};

export default AssetDetails;
