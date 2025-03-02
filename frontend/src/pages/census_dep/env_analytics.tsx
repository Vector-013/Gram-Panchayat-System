import { useEffect, useState } from "react";

interface EnvironmentalData {
  temperature: number;
  humidity: number;
  air_quality_index: number;
  noise_level: number;
  water_quality_index: number;
}

const EnvironmentalDataComponent = () => {
  const [data, setData] = useState<EnvironmentalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/get-today-env");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result: EnvironmentalData = await response.json();
        setData(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Environmental Data</h2>
      <p>Temperature: {data.temperature} °C</p>
      <p>Humidity: {data.humidity} %</p>
      <p>Air Quality Index: {data.air_quality_index}</p>
      <p>Noise Level: {data.noise_level} dB</p>
      <p>Water Quality Index: {data.water_quality_index}</p>
    </div>
  );
};

export default EnvironmentalDataComponent;
