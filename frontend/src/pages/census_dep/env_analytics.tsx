import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface EnvironmentalData {
  date_recorded: string;
  temperature: number;
  humidity: number;
  aqi: number;
  rainfall: number;
}

interface ApiResponse {
  today_data: EnvironmentalData;
  all_data: EnvironmentalData[];
}


const EnvironmentalDataComponent = () => {
  const [todayData, setTodayData] = useState<EnvironmentalData | null>(null);
  const [allData, setAllData] = useState<EnvironmentalData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8000/get-today-env/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result: ApiResponse = await response.json();
        setTodayData(result.today_data??null);
        setAllData(result.all_data??[]);
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

   return (
  <div className="graph-holder col card-holder">
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Environmental Data Trends</h2>

      Today’s Data (Handles Null Case)
      {todayData ? (
        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-2">Today's Data ({todayData.date_recorded})</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-2 bg-blue-100 rounded text-center">
              <p className="text-sm font-semibold">AQI</p>
              <p className="text-lg font-bold">{todayData.aqi}</p>
            </div>
            <div className="p-2 bg-orange-100 rounded text-center">
              <p className="text-sm font-semibold">Temperature (°C)</p>
              <p className="text-lg font-bold">{todayData.temperature}</p>
            </div>
            <div className="p-2 bg-green-100 rounded text-center">
              <p className="text-sm font-semibold">Humidity (%)</p>
              <p className="text-lg font-bold">{todayData.humidity}</p>
            </div>
            <div className="p-2 bg-teal-100 rounded text-center">
              <p className="text-sm font-semibold">Rainfall (mm)</p>
              <p className="text-lg font-bold">{todayData.rainfall}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="mb-6 text-center text-gray-500">No data available for today.</p>
      )}

      {/* Historical Trends */}
      <div className="chart-container">
        <h3 className="text-lg font-semibold mb-2">Historical Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={allData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date_recorded" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#ff7300" name="Temperature (°C)" />
            <Line type="monotone" dataKey="humidity" stroke="#0088FE" name="Humidity (%)" />
            <Line type="monotone" dataKey="rainfall" stroke="#00C49F" name="Rainfall (mm)" />
            <Line type="monotone" dataKey="aqi" stroke="#FF0000" name="AQI" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Environmental Factors Comparison */}
      <div className="chart-container">
        <h3 className="text-lg font-semibold mb-2">Environmental Factors Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={allData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date_recorded" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="temperature" fill="#ff7300" name="Temperature (°C)" />
            <Bar dataKey="humidity" fill="#0088FE" name="Humidity (%)" />
            <Bar dataKey="rainfall" fill="#00C49F" name="Rainfall (mm)" />
            <Bar dataKey="aqi" fill="#FF0000" name="AQI" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
  );
};

export default EnvironmentalDataComponent;