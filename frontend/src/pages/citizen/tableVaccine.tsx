import React from "react";
import "../../styles/CitizenVaccine.css";

interface VaccineRecord {
    citizen_id: number;
    vaccination_id: number;
    name: string;
    vaccination_type: string;
    date_administered: string;
    age: number;
}

interface Props {
    vaccineRecords: VaccineRecord[];
}

const VaccineRecordsTable: React.FC<Props> = ({ vaccineRecords }) => {
    return (
        <div className="vaccine-table-container">
            <table className="vaccine-table">
                <thead>
                    <tr>
                        <th>Citizen ID</th>
                        <th>Vaccination ID</th>
                        <th>Name</th>
                        <th>Vaccination Type</th>
                        <th>Date Administered</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {vaccineRecords.length > 0 ? (
                        vaccineRecords.map((vaccineRecord) => (
                            <tr key={vaccineRecord.vaccination_id}>
                                <td>{vaccineRecord.citizen_id}</td>
                                <td>{vaccineRecord.vaccination_id}</td>
                                <td>{vaccineRecord.name}</td>
                                <td>{vaccineRecord.vaccination_type}</td>
                                <td>{vaccineRecord.date_administered}</td>
                                <td>{vaccineRecord.age}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="no-data">
                                No vaccination records found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default VaccineRecordsTable;
