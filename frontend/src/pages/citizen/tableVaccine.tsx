import React from "react";

interface VaccineRecord {
    citizen_id: number;
    vaccination_id: number;
    name: string;
    vaccination_type: string;
    date_administered: string;
}

interface Props {
    vaccineRecords: VaccineRecord[];
}

const VaccineRecordsTable: React.FC<Props> = ({ vaccineRecords }) => {
    return (
        <div style={{ overflowX: "auto", maxHeight: "400px", overflowY: "auto" }}>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    minWidth: "600px",
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: "#f2f2f2" }}>
                        <th style={tableHeaderStyle}>Citizen ID</th>
                        <th style={tableHeaderStyle}>Vaccination ID</th>
                        <th style={tableHeaderStyle}>Name</th>
                        <th style={tableHeaderStyle}>Vaccination Type</th>
                        <th style={tableHeaderStyle}>Date Administered</th>
                    </tr>
                </thead>
                <tbody>
                    {vaccineRecords.length > 0 ? (
                        vaccineRecords.map((vaccineRecord) => (
                            <tr key={vaccineRecord.vaccination_id} style={tableRowStyle}>
                                <td style={tableCellStyle}>{vaccineRecord.citizen_id}</td>
                                <td style={tableCellStyle}>{vaccineRecord.vaccination_id}</td>
                                <td style={tableCellStyle}>{vaccineRecord.name}</td>
                                <td style={tableCellStyle}>{vaccineRecord.vaccination_type}</td>
                                <td style={tableCellStyle}>{vaccineRecord.date_administered}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} style={{ textAlign: "center", padding: "10px" }}>
                                No vaccination records found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

const tableHeaderStyle: React.CSSProperties = {
    padding: "10px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
};

const tableCellStyle: React.CSSProperties = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const tableRowStyle: React.CSSProperties = {
  backgroundColor: "#fff",
};

export default VaccineRecordsTable;
