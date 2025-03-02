import React, { useState } from "react";
import "../../styles/QueryAdmin.css";

const QueryAdmin: React.FC = () => {
    const [query, setQuery] = useState<string>("");
    const [results, setResults] = useState<any[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getToken = () => {
        return localStorage.getItem("token"); // Retrieve token securely
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResults([]);
        setColumns([]);

        try {
            const response = await fetch("http://localhost:8000/admin/query", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Query execution failed");
            }

            const data = await response.json();

            if (data.length > 0) {
                setColumns(Object.keys(data[0])); // Extract column names dynamically
                setResults(data);
            } else {
                setError("No records found.");
            }
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="query-admin-container col card-holder">
            <h2 className="query-admin-title">Execute SQL Query</h2>

            {error && <div className="query-admin-error">{error}</div>}

            <form className="query-admin-form" onSubmit={handleSubmit}>
                <label className="query-admin-label">Enter SQL Query:</label>
                <textarea
                    className="query-admin-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="SELECT * FROM citizens;"
                    required
                />
                <button className="query-admin-submit" type="submit" disabled={loading}>
                    {loading ? "Executing..." : "Run Query"}
                </button>
            </form>

            {results.length > 0 && (
                <div className="query-results-container">
                    <table className="query-results-table">
                        <thead>
                            <tr>
                                {columns.map((col) => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((row, index) => (
                                <tr key={index}>
                                    {columns.map((col) => (
                                        <td key={col}>{row[col]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default QueryAdmin;
