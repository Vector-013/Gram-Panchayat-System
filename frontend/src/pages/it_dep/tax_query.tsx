import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/TaxQuery.css";

function TaxQueryForm() {
    const [queryType, setQueryType] = useState("person");
    const [id, setId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [minAmount, setMinAmount] = useState(0);
    const [maxAmount, setMaxAmount] = useState(100000);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (minAmount > maxAmount) {
            setError("Minimum amount cannot be greater than maximum amount.");
            return;
        }

        try {
            const requestBody = {
                query_type: queryType,
                id,
                start_date: startDate,
                end_date: endDate,
                min_amount: minAmount,
                max_amount: maxAmount,
            };

            const response = await fetch("http://localhost:8000/tax/query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Submission failed");
            }
            navigate("/success");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="col card-holder tax-query-container">
            <div className="header">
                <div className="tax-query-title">Tax Query</div>
                <button className="back-button" onClick={() => navigate("/it-dashboard")}>Back</button>
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <form className="tax-query-form" onSubmit={handleSubmit}>
                <div>
                    <label className="tax-query-label">Query Type:</label>
                    <div>
                        <input
                            type="radio"
                            id="person"
                            name="queryType"
                            value="person"
                            checked={queryType === "person"}
                            onChange={() => setQueryType("person")}
                        />
                        <label htmlFor="person">Person</label>

                        <input
                            type="radio"
                            id="household"
                            name="queryType"
                            value="household"
                            checked={queryType === "household"}
                            onChange={() => setQueryType("household")}
                        />
                        <label htmlFor="household">Household</label>
                    </div>
                </div>
                <br />

                <div>
                    <label className="tax-query-label" htmlFor="id">ID:</label>
                    <input
                        className="tax-query-input"
                        type="text"
                        id="id"
                        name="id"
                        required
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <br /><br />

                <div>
                    <label className="tax-query-label" >Date Range:</label>
                    <br />
                    <label className="tax-query-label" htmlFor="start_date">From:</label>
                    <input
                        className="tax-query-input"
                        type="date"
                        id="start_date"
                        name="start_date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />

                    <label className="tax-query-label" htmlFor="end_date">To:</label>
                    <input
                        className="tax-query-input"
                        type="date"
                        id="end_date"
                        name="end_date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <br /><br />

                <div>
                    <label className="tax-query-label" >Amount Range:</label>
                    <br />
                    <label className="tax-query-label" htmlFor="min_amount">Min:</label>
                    <input
                        className="tax-query-input"
                        type="number"
                        id="min_amount"
                        name="min_amount"
                        min="0"
                        step="100"
                        value={minAmount}
                        onChange={(e) => setMinAmount(parseFloat(e.target.value))}
                    />

                    <label className="tax-query-label" htmlFor="max_amount">Max:</label>
                    <input
                        className="tax-query-input"
                        type="number"
                        id="max_amount"
                        name="max_amount"
                        min="0"
                        step="100"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(parseFloat(e.target.value))}
                    />
                </div>
                <br /><br />

                <input className="tax-query-submit" type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default TaxQueryForm;
