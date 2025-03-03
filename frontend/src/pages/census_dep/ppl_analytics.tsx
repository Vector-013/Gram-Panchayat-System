import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../../styles/DataChart.css";
// Define Type for API Response
type ApiResponse = {
  births: { year: number; gender: string; count: number }[];
  deaths: { year: number; gender: string; count: number }[];
  marriages: { year: number; gender: string; count: number }[];
};

// Define Type for Processed Data
type YearlyData = {
  year: number;
  birthMale: number;
  birthFemale: number;
  marriage: number;
  deathMale: number;
  deathFemale: number;
};

// Transform API Response into Chart Data
const transformData = (data: ApiResponse) => {
  const transformedData: Record<number, Omit<YearlyData, "year">> = {};

  // Process Births
  data.births.forEach(({ year, gender, count }) => {
    if (!transformedData[year]) transformedData[year] = { birthMale: 0, birthFemale: 0, marriage: 0, deathMale: 0, deathFemale: 0 };
    if (gender === "Male") transformedData[year].birthMale += count;
    else if (gender === "Female") transformedData[year].birthFemale += count;
  });

  // Process Deaths
  data.deaths.forEach(({ year, gender, count }) => {
    if (!transformedData[year]) transformedData[year] = { birthMale: 0, birthFemale: 0, marriage: 0, deathMale: 0, deathFemale: 0 };
    if (gender === "Male") transformedData[year].deathMale += count;
    else if (gender === "Female") transformedData[year].deathFemale += count;
  });

  // Process Marriages
  data.marriages.forEach(({ year, count }) => {
    if (!transformedData[year]) transformedData[year] = { birthMale: 0, birthFemale: 0, marriage: 0, deathMale: 0, deathFemale: 0 };
    transformedData[year].marriage += count;
  });

  // Convert transformedData into an array for Recharts
  return Object.entries(transformedData).map(([year, values]) => ({
    year: Number(year),
    ...values,
  }));
};

// React Component to Fetch and Display Data
    const DataChart: React.FC = () => {
  const [chartData, setChartData] = useState<YearlyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
         try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8000/census/analytics-data/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch data");
        const data: ApiResponse = await response.json();
        setChartData(transformData(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ width: "100%", height: "80%", overflowY: "auto" }} className="col card-holder ppl-holder">
      <h2>Births, Deaths, and Marriages Over the Years</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barSize={50}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="birthMale" fill="#4285F4" name="Birth Male" />
          <Bar dataKey="birthFemale" fill="#FF6D00" name="Birth Female" />
          <Bar dataKey="marriage" fill="#34A853" name="Marriage" />
          <Bar dataKey="deathMale" fill="#EA4335" name="Death Male" />
          <Bar dataKey="deathFemale" fill="#AA00FF" name="Death Female" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataChart;
