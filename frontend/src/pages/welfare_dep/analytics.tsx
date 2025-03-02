import { useEffect, useState } from "react";
import {
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

interface AnalysisData {
  medical_analysis: { medical_condition: string; gender: string; count: number }[];
  vaccination_analysis: { vaccination_type: string; gender: string; count: number }[];
  education_analysis: { educational_qualification: string; gender: string; count: number }[];
}

const MedicalEducationCharts = () => {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8000/welfare/analytics/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result: AnalysisData = await response.json();
        setData(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="loading-message">Loading data...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;
  if (!data) return <p className="no-data-message">No data available.</p>;

  const processChartData = (data: { gender: string; count: number }[], key: string) => {
    const groupedData: Record<string, { name: string; Male: number; Female: number }> = {};

    data.forEach((entry) => {
      const category = (entry as any)[key];
      if (!groupedData[category]) {
        groupedData[category] = { name: category, Male: 0, Female: 0 };
      }
      groupedData[category][entry.gender as "Male" | "Female"] = entry.count;
    });

    return Object.values(groupedData);
  };

  return (
    <div className="analytics-container col card-holder">
      <h2 className="chart-title">Health and Education Analytics</h2>

      <div className="chart-wrapper">
        <h3 className="chart-subtitle">Medical Condition vs Count</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={processChartData(data.medical_analysis, "medical_condition")}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Male" fill="#4A90E2" />
            <Bar dataKey="Female" fill="#E94E77" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-wrapper">
        <h3 className="chart-subtitle">Vaccination Type vs Count</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={processChartData(data.vaccination_analysis, "vaccination_type")}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Male" fill="#2ECC71" />
            <Bar dataKey="Female" fill="#FF5733" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-wrapper">
        <h3 className="chart-subtitle">Educational Qualification vs Count</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={processChartData(data.education_analysis, "educational_qualification")}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Male" fill="#3498DB" />
            <Bar dataKey="Female" fill="#E74C3C" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MedicalEducationCharts;
