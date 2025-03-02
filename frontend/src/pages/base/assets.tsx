import React, { useEffect, useState } from "react";
import AssetsTable from "./assetTable";

interface Asset {
  asset_id: number;
  type: string;
  location: string;
  installation_date: string;
}

const AssetsPage: React.FC = () => {
  const [assetCounts, setAssetCounts] = useState<{ type: string; count: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("http://localhost:5000/assets", 
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data: Asset[] = await response.json();

        // Count asset types
        const counts = data.reduce((acc: Record<string, number>, asset) => {
          acc[asset.type] = (acc[asset.type] || 0) + 1;
          return acc;
        }, {});

        // Convert object to array
        const assetCountsArray = Object.entries(counts).map(([type, count]) => ({
          type,
          count,
        }));

        setAssetCounts(assetCountsArray);
      } catch (err) {
        console.error(err);
        setError("Error loading assets data");
      }

      setLoading(false);
    };

    fetchAssets();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Asset Summary</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <AssetsTable assetCounts={assetCounts} />
      )}
    </div>
  );
};

export default AssetsPage;
