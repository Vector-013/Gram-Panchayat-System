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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data available.</p>;

 const processChartData = (data: { gender: string; count: number }[], key: string) => {
  const groupedData: Record<string, { name: string; Male: number; Female: number }> = {};

  data.forEach((entry) => {
    const category = (entry as any)[key]; // Explicitly access key dynamically
    if (!groupedData[category]) {
      groupedData[category] = { name: category, Male: 0, Female: 0 };
    }
    groupedData[category][entry.gender as "Male" | "Female"] = entry.count;
  });

  return Object.values(groupedData);
};
  return (
    <div className="graph-holder col card-holder">
      <h2 className="chart-title">Health and Education Analytics</h2>

      <div className="chart-section">
        <h3 className="chart-subtitle">Medical Condition vs Count</h3>
        <ResponsiveContainer width="100%" height={300}>
        <BarChart width={600} height={400} data={processChartData(data.medical_analysis, "medical_condition")}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" label={{ value: "Medical Condition", position: "insideBottom", offset: -5 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Male" fill="#8884d8" />
        <Bar dataKey="Female" fill="#82ca9d" />
        </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-section">
        <h3 className="chart-subtitle">Vaccination Type vs Count</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={processChartData(data.vaccination_analysis, "vaccination_type")}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label={{ value: "Vaccination Type", position: "insideBottom", offset: -5 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Male" fill="#0088FE" name="Male" />
            <Bar dataKey="Female" fill="#FF69B4" name="Female" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-section">
        <h3 className="chart-subtitle">Educational Qualification vs Count</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={processChartData(data.education_analysis, "educational_qualification")}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label={{ value: "Educational Qualification", position: "insideBottom", offset: -5 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Male" fill="#0088FE" name="Male" />
            <Bar dataKey="Female" fill="#FF69B4" name="Female" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MedicalEducationCharts;
