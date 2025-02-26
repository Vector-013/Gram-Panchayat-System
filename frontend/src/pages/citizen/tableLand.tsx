import React from "react";

interface LandRecord {
    citizen_id: number;
    land_id: number;
    name: string;
    area_acres: number;
    crop_type: string;
}

interface Props {
    landRecords: LandRecord[];
}

const LandRecordsTable: React.FC<Props> = ({ landRecords }) => {
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
                        <th style={tableHeaderStyle}>Land ID</th>
                        <th style={tableHeaderStyle}>Name</th>
                        <th style={tableHeaderStyle}>Area (acres)</th>
                        <th style={tableHeaderStyle}>Crop Type</th>
                    </tr>
                </thead>
                <tbody>
                    {landRecords.length > 0 ? (
                        landRecords.map((landRecord) => (
                            <tr key={landRecord.land_id} style={tableRowStyle}>
                                <td style={tableCellStyle}>{landRecord.citizen_id}</td>
                                <td style={tableCellStyle}>{landRecord.land_id}</td>
                                <td style={tableCellStyle}>{landRecord.name}</td>
                                <td style={tableCellStyle}>{landRecord.area_acres}</td>
                                <td style={tableCellStyle}>{landRecord.crop_type}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} style={{ textAlign: "center", padding: "10px" }}>
                                No land records found
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

export default LandRecordsTable;