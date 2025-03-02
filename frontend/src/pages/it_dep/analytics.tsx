import React, { useEffect, useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import "../../styles/ITAnalytics.css";

const FinancialGraph: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/it-dept/analytics1");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const rawData = await response.json();
        setData(processData(rawData));
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processData = (data: any) => {
    const years = new Set<number>();

    // Extract all available years
    data.budget?.forEach((item: any) => years.add(item.year));
    data.assets?.forEach((item: any) => years.add(item.year));
    data.taxes?.forEach((item: any) => years.add(item.year));
    data.income?.forEach((item: any) => years.add(item.year));
    data.expenditure?.forEach((item: any) => years.add(item.year));

    // Convert to sorted array
    const yearList = Array.from(years).sort((a, b) => a - b);

    const fixedSalary = data.salaries || 0;

    return yearList.map((year) => {
      const budgetEntry = data.budget?.find((item: any) => item.year === year);
      const assetEntry = data.assets?.find((item: any) => item.year === year);
      const taxEntry = data.taxes?.find((item: any) => item.year === year);
      const incomeEntry = data.income?.find((item: any) => item.year === year);
      const expenditureEntry = data.expenditure?.find((item: any) => item.year === year);

      return {
        year: year.toString(),
        budget: budgetEntry ? budgetEntry.total_budget : undefined,
        assets: assetEntry ? assetEntry.total_assets : undefined,
        taxes: taxEntry ? taxEntry.total_taxes : undefined,
        salaries: fixedSalary,
        income: incomeEntry ? incomeEntry.total_income : undefined,
        expenditure: expenditureEntry ? expenditureEntry.total_expenditure : undefined,
      };
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="graph-holder col card-holder">
      {/* Bar Chart */}
      <div className="chart-container">
        <h3 className="chart-title">Financial Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="budget" fill="#8884d8" name="Budget" />
            <Bar dataKey="assets" fill="#82ca9d" name="Assets" />
            <Bar dataKey="taxes" fill="#ffc658" name="Taxes" />
            <Bar dataKey="salaries" fill="#ff7300" name="Salaries" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="chart-container">
        <h3 className="chart-title">Income vs Expenditure</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#0088FE" name="Income" />
            <Line type="monotone" dataKey="expenditure" stroke="#FF0000" name="Expenditure" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinancialGraph;
