import React from "react";
import "../../styles/CitizenGeo.css";

interface GeoRecord {
    feature_id: number;
    feature_type: string;
    name: string;
    area: number;
}

interface Props {
    geoRecords: GeoRecord[];
}

const GeoRecordsTable: React.FC<Props> = ({ geoRecords }) => {
    return (
        <div className="geo-table-container">
            <table className="geo-table">
                <thead>
                    <tr>
                        <th>Feature ID</th>
                        <th>Feature Type</th>
                        <th>Name</th>
                        <th>Area (sq km)</th>
                    </tr>
                </thead>
                <tbody>
                    {geoRecords.length > 0 ? (
                        geoRecords.map((record) => (
                            <tr key={record.feature_id}>
                                <td>{record.feature_id}</td>
                                <td>{record.feature_type}</td>
                                <td>{record.name}</td>
                                <td>{record.area}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="no-data">
                                No geographic records found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default GeoRecordsTable;
