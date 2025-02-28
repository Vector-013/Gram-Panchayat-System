import React from "react";
import "../../styles/CitizenLand.css";

interface LandRecord {
    citizen_id: number;
    name: string;
    area_acres: number;
    crop_type: string;
}

interface Props {
    landRecords: LandRecord[];
}

const LandRecordsTable: React.FC<Props> = ({ landRecords }) => {
    return (
        <div className="land-table-container">
            <table className="land-table">
                <thead>
                    <tr>
                        <th>Citizen ID</th>
                        <th>Name</th>
                        <th>Area (acres)</th>
                        <th>Crop Type</th>
                    </tr>
                </thead>
                <tbody>
                    {landRecords.length > 0 ? (
                        landRecords.map((landRecord) => (
                            <tr key={landRecord.citizen_id}>
                                <td>{landRecord.citizen_id}</td>
                                <td>{landRecord.name}</td>
                                <td>{landRecord.area_acres}</td>
                                <td>{landRecord.crop_type}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="no-data">
                                No land records found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LandRecordsTable;
