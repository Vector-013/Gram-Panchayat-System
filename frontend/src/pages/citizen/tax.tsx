import React, { useEffect, useState } from "react";
import TaxTable from "./taxTable";

interface TaxRecord {
  tax_id: number;
  citizen_id: number;
  name: string;
  payment_status: string;
  type: string;
  tax_amount: number;
}

const TaxRecords: React.FC = () => {
  const [taxes, setTaxes] = useState<TaxRecord[]>([]);
  const [filteredTaxes, setFilteredTaxes] = useState<TaxRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Filter states
  const [nameFilter, setNameFilter] = useState<string>("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("");
  const [taxTypeFilter, setTaxTypeFilter] = useState<string>("");
  const [taxRange, setTaxRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000000,
  });

  useEffect(() => {
    const fetchTaxes = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("http://localhost:5000/taxes");
        const data = await response.json();

        const formattedData = data.map(
          ({ tax_id, citizen_id, name, payment_status, type, tax_amount }: TaxRecord) => ({
            tax_id,
            citizen_id,
            name,
            payment_status,
            type,
            tax_amount,
          })
        );

        setTaxes(formattedData);
      } catch (err) {
        console.error(err);
        setError("Error loading tax records");
      }

      setLoading(false);
    };

    fetchTaxes();
  }, []);

  useEffect(() => {
    const filtered = taxes.filter((tax) => {
      const matchesName = tax.name.toLowerCase().includes(nameFilter.toLowerCase());
      const matchesPaymentStatus = paymentStatusFilter
        ? tax.payment_status === paymentStatusFilter
        : true;
      const matchesTaxType = taxTypeFilter ? tax.type === taxTypeFilter : true;
      const matchesTax = tax.tax_amount >= taxRange.min && tax.tax_amount <= taxRange.max;

      return matchesName && matchesPaymentStatus && matchesTaxType && matchesTax;
    });

    setFilteredTaxes(filtered);
  }, [nameFilter, paymentStatusFilter, taxTypeFilter, taxRange, taxes]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tax Records</h2>

      {/* Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Filter by Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          style={inputStyle}
        />
        <select
          value={paymentStatusFilter}
          onChange={(e) => setPaymentStatusFilter(e.target.value)}
          style={inputStyle}
        >
          <option value="">All Payment Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>

        <select
          value={taxTypeFilter}
          onChange={(e) => setTaxTypeFilter(e.target.value)}
          style={inputStyle}
        >
          <option value="">All Tax Types</option>
          <option value="Income Tax">Income Tax</option>
          <option value="Property Tax">Property Tax</option>
          <option value="Sales Tax">Sales Tax</option>
        </select>

        {/* Tax Amount Range */}
        <div>
          <label style={labelStyle}>Tax Range:</label>
          <input
            type="number"
            placeholder="Min Tax"
            value={taxRange.min}
            onChange={(e) =>
              setTaxRange((prev) => ({ ...prev, min: parseInt(e.target.value) || 0 }))
            }
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Max Tax"
            value={taxRange.max}
            onChange={(e) =>
              setTaxRange((prev) => ({ ...prev, max: parseInt(e.target.value) || 1000000 }))
            }
            style={inputStyle}
          />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <TaxTable taxes={filteredTaxes} />
      )}
    </div>
  );
};

// Styles
const inputStyle: React.CSSProperties = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  width: "180px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "bold",
  marginRight: "5px",
};

export default TaxRecords;
