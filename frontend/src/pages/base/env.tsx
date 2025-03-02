import React, { useEffect, useState } from "react";
import EnvironmentTable from "./envTable";

interface EnvironmentRecord {
  env_id: number;
  aqi: number;
  temperature: number;
  humidity: number;
  rainfall: number;
  date_recorded: string; // String format "YYYY-MM-DD"
}

const EnvironmentStats: React.FC = () => {
  const [stats, setStats] = useState<Record<string, { min: number; max: number; avg: number }>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEnvironmentData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("http://localhost:5000/env",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data: EnvironmentRecord[] = await response.json();

        // Convert string dates to Date objects
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const recentData = data.filter((record) => {
          const recordDate = new Date(record.date_recorded); // Convert string to Date
          return recordDate >= oneMonthAgo;
        });

        if (recentData.length === 0) {
          setStats({});
          return;
        }

        // Compute min, max, and avg
        const metrics = ["aqi", "temperature", "humidity", "rainfall"];
        const computedStats: Record<string, { min: number; max: number; avg: number }> = {};

        metrics.forEach((metric) => {
          const values = recentData.map((record) => record[metric as keyof EnvironmentRecord] as number);
          computedStats[metric] = {
            min: Math.min(...values),
            max: Math.max(...values),
            avg: values.reduce((sum, val) => sum + val, 0) / values.length,
          };
        });

        setStats(computedStats);
      } catch (err) {
        console.error(err);
        setError("Error loading environment data");
      }

      setLoading(false);
    };

    fetchEnvironmentData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Environmental Statistics (Last Month)</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <EnvironmentTable stats={stats} />
      )}
    </div>
  );
};

export default EnvironmentStats;
