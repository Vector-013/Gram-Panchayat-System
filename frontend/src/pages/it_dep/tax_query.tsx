import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h2>Tax Query</h2>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>Query Type:</label>
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
                <br />

                <label htmlFor="id">ID:</label>
                <input 
                    type="text" 
                    id="id" 
                    name="id" 
                    required 
                    value={id} 
                    onChange={(e) => setId(e.target.value)}
                />
                <br /><br />

                <label>Date Range:</label>
                <br />
                <label htmlFor="start_date">From:</label>
                <input 
                    type="date" 
                    id="start_date" 
                    name="start_date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)}
                />

                <label htmlFor="end_date">To:</label>
                <input 
                    type="date" 
                    id="end_date" 
                    name="end_date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <br /><br />

                <label>Amount Range:</label>
                <br />
                <label htmlFor="min_amount">Min:</label>
                <input 
                    type="number" 
                    id="min_amount" 
                    name="min_amount" 
                    min="0" 
                    step="100" 
                    value={minAmount} 
                    onChange={(e) => setMinAmount(parseFloat(e.target.value))} 
                />

                <label htmlFor="max_amount">Max:</label>
                <input 
                    type="number" 
                    id="max_amount" 
                    name="max_amount" 
                    min="0" 
                    step="100" 
                    value={maxAmount} 
                    onChange={(e) => setMaxAmount(parseFloat(e.target.value))} 
                />
                <br /><br />

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default TaxQueryForm;
