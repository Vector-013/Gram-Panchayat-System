import React from "react";
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

interface Props {
  taxes: TaxRecord[];
}

const TaxTable: React.FC<Props> = ({ taxes }) => {
  return (
    <div className="tax-table-container">
      <table className="tax-table">
        <thead>
          <tr>
            <th>Tax ID</th>
            <th>Citizen ID</th>
            <th>Name</th>
            <th>Payment Status</th>
            <th>Tax Type</th>
            <th>Tax Amount</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {taxes.length > 0 ? (
            taxes.map((tax) => (
              <tr key={tax.tax_id}>
                <td>{tax.tax_id}</td>
                <td>{tax.citizen_id}</td>
                <td>{tax.name}</td>
                <td className={tax.payment_status === "Paid" ? "tax-paid" : "tax-pending"}>
                  {tax.payment_status}
                </td>
                <td>{tax.type}</td>
                <td>{tax.tax_amount}</td>
                <td>{tax.year}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="no-data">
                No tax records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaxTable;
