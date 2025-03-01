import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/TaxQuery.css";

interface TaxRecord {
  tax_id: number;
  type: string;
  amount: number;
  status: string;
  citizen_id: number;
  date: string;
}

function TaxQueryForm() {
  const [queryType, setQueryType] = useState("person");
  const [id, setId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(100000);
  const [error, setError] = useState<string | null>(null);
  const [taxRecords, setTaxRecords] = useState<TaxRecord[]>([]);
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
      const data: TaxRecord[] = await response.json();
      setTaxRecords(data);
      navigate("/success"); //doubtful
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="col card-holder tax-query-container">
      <div className="header">
        <div className="tax-query-title">Tax Query</div>
        <button
          className="back-button"
          onClick={() => navigate("/it-dashboard")}
        >
          Back
        </button>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form className="tax-query-form" onSubmit={handleSubmit}>
        <label className="tax-query-label" htmlFor="queryType">
          Query Type:
        </label>
        <select
          id="queryType"
          name="queryType"
          className="tax-query-input"
          value={queryType}
          onChange={(e) => setQueryType(e.target.value)}
        >
          <option value="person">Person</option>
          <option value="household">Household</option>
        </select>

        <label className="tax-query-label" htmlFor="id">
          ID:
        </label>
        <input
          className="tax-query-input"
          type="text"
          id="id"
          name="id"
          required
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <div className="tax-query-range">
          <label className="tax-query-label">Date Range:</label>
          <div className="tax-query-input-group">
            <label className="tax-query-label-small" htmlFor="start_date">
              From:
            </label>
            <input
              className="tax-query-input"
              type="date"
              id="start_date"
              name="start_date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span className="tax-query-separator"></span>

            <label className="tax-query-label-small" htmlFor="end_date">
              To:
            </label>
            <input
              className="tax-query-input"
              type="date"
              id="end_date"
              name="end_date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>


        <div className = "tax-query-range">
        <label className="tax-query-label">Amount Range:</label>
        <div className="tax-query-input-group">
          <label className="tax-query-label-small" htmlFor="min_amount">
            Min:
          </label>
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

          <span className="tax-query-separator"></span>
          <label className="tax-query-label-small" htmlFor="max_amount">
            Max:
          </label>
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
        </div>

        <input className="tax-query-submit" type="submit" value="Submit" />
      </form>

      {taxRecords.length > 0 && (
        <div className="tax-records-container">
          <table className="tax-records-table">
            <thead>
              <tr>
                <th>Tax ID</th>
                <th>Type</th>
                <th>Amount (rupees)</th>
                <th>Status</th>
                <th>Citizen id</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {taxRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.tax_id}</td>
                  <td>{record.type}</td>
                  <td>{record.amount}</td>
                  <td>{record.status}</td>
                  <td>{record.citizen_id}</td>
                  <td>{record.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TaxQueryForm;
