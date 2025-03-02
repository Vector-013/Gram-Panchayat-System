import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/TaxQuery.css";

interface TaxRecord {
  tax_id: number;
  type: string;
  amount: number;
  status: string;
  citizen_id: number;
  date: string;
  name: string;
  name: string;
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
  const [filteredRecords, setFilteredRecords] = useState<TaxRecord[]>([]);
  const [total_paid, setTotalPaid] = useState("");
  const [total_pending, setTotalPending] = useState("");

  // Additional Filters
  const [nameFilter, setNameFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");

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

      const response = await fetch("http://localhost:8000/it-dept/taxes", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }
      const res = await response.json();
      const data_paid: TaxRecord[] = res.paid_taxes;
      const data_pending: TaxRecord[] = res.pending_taxes;
      setTotalPaid(res.total_paid);
      setTotalPending(res.total_pending);
      setTaxRecords([...data_paid, ...data_pending]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Apply filters dynamically using useEffect
  useEffect(() => {
    const filtered = taxRecords.filter((record) => {
      const matchesName =
        nameFilter === "" || record.name.toLowerCase().includes(nameFilter.toLowerCase());

      const matchesType =
        typeFilter === "" || record.type.toLowerCase().includes(typeFilter.toLowerCase());

      const matchesStatus =
        statusFilter === "" || record.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesAmountRange =
        record.amount >= minAmount && record.amount <= maxAmount;

      const matchesDateRange =
        (minDate === "" || new Date(record.date) >= new Date(minDate)) &&
        (maxDate === "" || new Date(record.date) <= new Date(maxDate));

      return matchesName && matchesType && matchesStatus && matchesAmountRange && matchesDateRange;
    });

    setFilteredRecords(filtered);
  }, [nameFilter, typeFilter, statusFilter, minAmount, maxAmount, minDate, maxDate, taxRecords]);

  return (
    <div className="col card-holder tax-query-container">
      <div className="tax-query-title">Tax Query</div>


      {error && <div style={{ color: "red" }}>{error}</div>}
      <form className="tax-query-form" onSubmit={handleSubmit}>
        <div className="tax-query-group">
          <div className="tax-query-subgroup">
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
          </div>

          <div className="tax-query-subgroup">
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
          </div>
        </div>
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

        <div className="tax-query-range">
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

      {/* Filters Section */}
      <div className="tax-filter-container">
        <div>
          <input
            type="text"
            placeholder="Filter by Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="tax-filter-input"
          />

          <input
            type="text"
            placeholder="Filter by Type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="tax-filter-input"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="tax-filter-input"
          >
            <option value="">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          Amount:
          <input
            type="number"
            placeholder="Min Amount"
            value={minAmount}
            onChange={(e) => setMinAmount(parseFloat(e.target.value))}
            className="tax-filter-input"
          />
          <input
            type="number"
            placeholder="Max Amount"
            value={maxAmount}
            onChange={(e) => setMaxAmount(parseFloat(e.target.value))}
            className="tax-filter-input"
          />
        </div>

        <div>
          Date :
          <input
            type="date"
            placeholder="Min Date"
            value={minDate}
            onChange={(e) => setMinDate(e.target.value)}
            className="tax-filter-input"
          />

          <input
            type="date"
            placeholder="Max Date"
            value={maxDate}
            onChange={(e) => setMaxDate(e.target.value)}
            className="tax-filter-input"
          />
        </div>
      </div>

      {filteredRecords.length > 0 && (
        <div>
          <div className="tax-stats">
            <div className="tax-paid">Total Paid : {total_paid}</div>
            <div className="tax-pending">Total Pending : {total_pending}</div>
          </div>
          <div className="tax-records-container">
            <table className="tax-records-table">
              <thead>
                <tr>
                  <th>Tax ID</th>
                  <th>Citizen ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Amount (rupees)</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record, index) => (
                  <tr key={index}>
                    <td>{record.tax_id}</td>
                    <td>{record.citizen_id}</td>
                    <td>{record.name}</td>
                    <td>{record.type}</td>
                    <td>{record.amount}</td>
                    <td>{record.status}</td>
                    <td>{record.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaxQueryForm;
