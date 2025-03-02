import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaxTable from "./taxTable";
import "../../styles/CitizenTax.css";

interface TaxRecord {
  tax_id: number;
  citizen_id: number;
  name: string;
  payment_status: string;
  type: string;
  tax_amount: number;
  year: number;
}

const CitizenTaxModal: React.FC = () => {
  const { citizenId } = useParams<{ citizenId: string }>();
  const [taxRecords, setTaxRecords] = useState<TaxRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<TaxRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Filter states
  const [nameFilter, setNameFilter] = useState<string>("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [minAmountFilter, setMinAmountFilter] = useState<string>("");
  const [maxAmountFilter, setMaxAmountFilter] = useState<string>("");
  const [minYearFilter, setMinYearFilter] = useState<string>("");
  const [maxYearFilter, setMaxYearFilter] = useState<string>("");

  useEffect(() => {
    const fetchTaxRecords = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`http://localhost:8000/api/${citizenId}/taxes`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data: TaxRecord[] = await response.json();
        console.log(data);
        setTaxRecords(data);
      } catch (err) {
        console.error(err);
        setError("Error loading tax records data");
      }

      setLoading(false);
    };

    fetchTaxRecords();
  }, [citizenId]);

  useEffect(() => {
    const filtered = taxRecords.filter((record) => {
      const taxAmount = record.tax_amount;
      const minAmount = minAmountFilter === "" ? Number.NEGATIVE_INFINITY : Number(minAmountFilter);
      const maxAmount = maxAmountFilter === "" ? Number.POSITIVE_INFINITY : Number(maxAmountFilter);
      const year = record.year;
      const minYear = minYearFilter === "" ? Number.NEGATIVE_INFINITY : Number(minYearFilter);
      const maxYear = maxYearFilter === "" ? Number.POSITIVE_INFINITY : Number(maxYearFilter);

      return (
        (nameFilter === "" || record.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
        (paymentStatusFilter === "" || record.payment_status === paymentStatusFilter) &&
        (typeFilter === "" || record.type.toLowerCase().includes(typeFilter.toLowerCase())) &&
        (taxAmount >= minAmount && taxAmount <= maxAmount) &&
        (year >= minYear && year <= maxYear)
      );
    });

    setFilteredRecords(filtered);
  }, [
    nameFilter,
    paymentStatusFilter,
    typeFilter,
    minAmountFilter,
    maxAmountFilter,
    minYearFilter,
    maxYearFilter,
    taxRecords,
  ]);

  return (
    <div className="tax-container col card-holder">
      <h2 className="tax-title">Tax Records</h2>

      {/* Filters */}
      <div className="tax-filter-container">
        <input
          type="text"
          placeholder="Filter by Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="tax-input"
        />

        <select
          value={paymentStatusFilter}
          onChange={(e) => setPaymentStatusFilter(e.target.value)}
          className="tax-input"
        >
          <option value="">All Payment Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>

        <input
          type="text"
          placeholder="Filter by Tax Type"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="tax-input"
        />

        <div className="tax-range">
          <label className="tax-label">Tax Amount:</label>
          <input
            type="number"
            placeholder="Min"
            value={minAmountFilter}
            onChange={(e) => setMinAmountFilter(e.target.value)}
            className="tax-input"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxAmountFilter}
            onChange={(e) => setMaxAmountFilter(e.target.value)}
            className="tax-input"
          />
        </div>

        <div className="tax-range">
          <label className="tax-label">Year:</label>
          <input
            type="number"
            placeholder="Min"
            value={minYearFilter}
            onChange={(e) => setMinYearFilter(e.target.value)}
            className="tax-input"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxYearFilter}
            onChange={(e) => setMaxYearFilter(e.target.value)}
            className="tax-input"
          />
        </div>
      </div>

      {/* Display Table */}
      {loading ? (
        <p className="tax-loading">Loading...</p>
      ) : error ? (
        <p className="tax-error">{error}</p>
      ) : (
        <TaxTable taxes={filteredRecords} />
      )}
    </div>
  );
};

export default CitizenTaxModal;
