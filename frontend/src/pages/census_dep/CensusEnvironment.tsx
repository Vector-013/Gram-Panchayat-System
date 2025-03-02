import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EnvRecordsTable from "./tableEnv";
import "../../styles/CensusEnv.css";

interface EnvRecord {
  env_id: number;
  aqi: number;
  temperature: number;
  humidity: number;
  rainfall: number;
  date_recorded: string;
}

interface TodayEnv {
  temp_today: number;
  humidity_today: number;
  rainfall_today: number;
  aqi_today: number;
}

const CensusEnvForm: React.FC = () => {
  const { citizenId } = useParams<{ citizenId: string }>();
  const [envRecords, setEnvRecords] = useState<EnvRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<EnvRecord[]>([]);
  const [todayEnv, setTodayEnv] = useState<TodayEnv | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Filter states
  const [minAqi, setMinAqi] = useState<string>("");
  const [maxAqi, setMaxAqi] = useState<string>("");
  const [minTemp, setMinTemp] = useState<string>("");
  const [maxTemp, setMaxTemp] = useState<string>("");
  const [minHumidity, setMinHumidity] = useState<string>("");
  const [maxHumidity, setMaxHumidity] = useState<string>("");
  const [minRainfall, setMinRainfall] = useState<string>("");
  const [maxRainfall, setMaxRainfall] = useState<string>("");

  useEffect(() => {
    const fetchEnvRecords = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`http://localhost:8000/census-env`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
        const data = await response.json();
        console.log(data);

        setEnvRecords(data.env);
        setTodayEnv({
          temp_today: data.temp_today,
          humidity_today: data.humidity_today,
          rainfall_today: data.rainfall_today,
          aqi_today: data.aqi_today,
        });
      } catch (err) {
        console.error(err);
        setError("Error loading environmental records");
      }

      setLoading(false);
    };

    fetchEnvRecords();
  }, [citizenId]);

  useEffect(() => {
    const filtered = envRecords.filter((record) => {
      const aqi = record.aqi;
      const temp = record.temperature;
      const humidity = record.humidity;
      const rainfall = record.rainfall;

      const minAqiValue = minAqi === "" ? Number.NEGATIVE_INFINITY : Number(minAqi);
      const maxAqiValue = maxAqi === "" ? Number.POSITIVE_INFINITY : Number(maxAqi);
      const minTempValue = minTemp === "" ? Number.NEGATIVE_INFINITY : Number(minTemp);
      const maxTempValue = maxTemp === "" ? Number.POSITIVE_INFINITY : Number(maxTemp);
      const minHumidityValue = minHumidity === "" ? Number.NEGATIVE_INFINITY : Number(minHumidity);
      const maxHumidityValue = maxHumidity === "" ? Number.POSITIVE_INFINITY : Number(maxHumidity);
      const minRainfallValue = minRainfall === "" ? Number.NEGATIVE_INFINITY : Number(minRainfall);
      const maxRainfallValue = maxRainfall === "" ? Number.POSITIVE_INFINITY : Number(maxRainfall);

      return (
        aqi >= minAqiValue && aqi <= maxAqiValue &&
        temp >= minTempValue && temp <= maxTempValue &&
        humidity >= minHumidityValue && humidity <= maxHumidityValue &&
        rainfall >= minRainfallValue && rainfall <= maxRainfallValue
      );
    });

    setFilteredRecords(filtered);
  }, [minAqi, maxAqi, minTemp, maxTemp, minHumidity, maxHumidity, minRainfall, maxRainfall, envRecords]);

  return (
    <div className="env-container card-holder">
      <h2 className="env-title">Environmental Dashboard</h2>

      {/* Today's Values */}
      {todayEnv && (
        <div className="env-today">
          <p><strong>Today's AQI:</strong> {todayEnv.aqi_today}</p>
          <p><strong>Today's Temperature:</strong> {todayEnv.temp_today}°C</p>
          <p><strong>Today's Humidity:</strong> {todayEnv.humidity_today}%</p>
          <p><strong>Today's Rainfall:</strong> {todayEnv.rainfall_today} mm</p>
        </div>
      )}

      {/* Filters */}
      <div className="env-filter-container">
        <div className="env-range">
          <label>AQI:</label>
          <input type="number" placeholder="Min" value={minAqi} onChange={(e) => setMinAqi(e.target.value)} className="env-input" />
          <input type="number" placeholder="Max" value={maxAqi} onChange={(e) => setMaxAqi(e.target.value)} className="env-input" />
        </div>

        <div className="env-range">
          <label>Temperature (°C):</label>
          <input type="number" placeholder="Min" value={minTemp} onChange={(e) => setMinTemp(e.target.value)} className="env-input" />
          <input type="number" placeholder="Max" value={maxTemp} onChange={(e) => setMaxTemp(e.target.value)} className="env-input" />
        </div>

        <div className="env-range">
          <label>Humidity (%):</label>
          <input type="number" placeholder="Min" value={minHumidity} onChange={(e) => setMinHumidity(e.target.value)} className="env-input" />
          <input type="number" placeholder="Max" value={maxHumidity} onChange={(e) => setMaxHumidity(e.target.value)} className="env-input" />
        </div>

        <div className="env-range">
          <label>Rainfall (mm):</label>
          <input type="number" placeholder="Min" value={minRainfall} onChange={(e) => setMinRainfall(e.target.value)} className="env-input" />
          <input type="number" placeholder="Max" value={maxRainfall} onChange={(e) => setMaxRainfall(e.target.value)} className="env-input" />
        </div>
      </div>

      {/* Display Table */}
      {loading ? (
        <p className="env-loading">Loading...</p>
      ) : error ? (
        <p className="env-error">{error}</p>
      ) : (
        <EnvRecordsTable envRecords={filteredRecords} />
      )}
    </div>
  );
};

export default CensusEnvForm;
