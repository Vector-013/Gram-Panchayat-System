import React from "react";

interface TaxRecord {
  tax_id: number;
  citizen_id: number;
  name: string;
  payment_status: string;
  type: string;
  tax_amount: number;
}

interface Props {
  taxes: TaxRecord[];
}

const TaxTable: React.FC<Props> = ({ taxes }) => {
  return (
    <div style={{ overflowX: "auto", maxHeight: "400px", overflowY: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: "700px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={tableHeaderStyle}>Tax ID</th>
            <th style={tableHeaderStyle}>Citizen ID</th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Payment Status</th>
            <th style={tableHeaderStyle}>Tax Type</th>
            <th style={tableHeaderStyle}>Tax Amount</th>
          </tr>
        </thead>
        <tbody>
          {taxes.length > 0 ? (
            taxes.map((tax) => (
              <tr key={tax.tax_id} style={tableRowStyle}>
                <td style={tableCellStyle}>{tax.tax_id}</td>
                <td style={tableCellStyle}>{tax.citizen_id}</td>
                <td style={tableCellStyle}>{tax.name}</td>
                <td style={tableCellStyle}>{tax.payment_status}</td>
                <td style={tableCellStyle}>{tax.type}</td>
                <td style={tableCellStyle}>{tax.tax_amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "10px" }}>
                No tax records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Styling
const tableHeaderStyle: React.CSSProperties = {
  padding: "10px",
  borderBottom: "2px solid #ddd",
  textAlign: "left",
};

const tableCellStyle: React.CSSProperties = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const tableRowStyle: React.CSSProperties = {
  backgroundColor: "#fff",
};

export default TaxTable;
