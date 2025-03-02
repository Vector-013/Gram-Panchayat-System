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
import "../../styles/EnvAnalytics.css";

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
         // Filter only 2024 data
        const filteredData = result.all_data
        .filter((entry) => entry.date_recorded.startsWith("2024"))
        .sort((a, b) => new Date(b.date_recorded).getTime() - new Date(a.date_recorded).getTime());

      setTodayData(result.today_data);
      setAllData(filteredData);
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
      <div className="chart-container">
        <h2 className="chart-title">Environmental Data Trends</h2>

        {todayData ? (
          <div className="today-data">
            <h3 className="chart-subtitle">Today's Data ({todayData.date_recorded})</h3>
            <div className="data-grid">
              <div className="data-box aqi">
                <p className="data-label">AQI</p>
                <p className="data-value">{todayData.aqi}</p>
              </div>
              <div className="data-box temperature">
                <p className="data-label">Temperature (°C)</p>
                <p className="data-value">{todayData.temperature}</p>
              </div>
              <div className="data-box humidity">
                <p className="data-label">Humidity (%)</p>
                <p className="data-value">{todayData.humidity}</p>
              </div>
              <div className="data-box rainfall">
                <p className="data-label">Rainfall (mm)</p>
                <p className="data-value">{todayData.rainfall}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="no-data">No data available for today.</p>
        )}

        <div className="chart-section">
          <h3 className="chart-subtitle">Historical Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={allData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date_recorded" />
              <YAxis domain={[0, 250]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#ff7300" name="Temperature (°C)" />
              <Line type="monotone" dataKey="humidity" stroke="#0088FE" name="Humidity (%)" />
              <Line type="monotone" dataKey="rainfall" stroke="#00C49F" name="Rainfall (mm)" />
              <Line type="monotone" dataKey="aqi" stroke="#FF0000" name="AQI" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-section">
          <h3 className="chart-subtitle">Environmental Factors Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={allData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date_recorded" />
              <YAxis domain={[0, 250]} />
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
