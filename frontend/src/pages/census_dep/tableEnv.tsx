import React from "react";
import "../../styles/CensusEnv.css";

interface EnvRecord {
    env_id: number;
    aqi: number;
    temperature: number;
    humidity: number;
    rainfall: number;
    date_recorded: string;
}

interface Props {
    envRecords: EnvRecord[];
}

const EnvRecordsTable: React.FC<Props> = ({ envRecords }) => {
    return (
        <div className="env-table-container">
            <table className="env-table">
                <thead>
                    <tr>
                        <th>Env ID</th>
                        <th>AQI</th>
                        <th>Temperature (°C)</th>
                        <th>Humidity (%)</th>
                        <th>Rainfall (mm)</th>
                        <th>Date Recorded</th>
                    </tr>
                </thead>
                <tbody>
                    {envRecords.length > 0 ? (
                        envRecords.map((record) => (
                            <tr key={record.env_id}>
                                <td>{record.env_id}</td>
                                <td className={record.aqi > 100 ? "env-high-aqi" : "env-normal-aqi"}>
                                    {record.aqi}
                                </td>
                                <td>{record.temperature}</td>
                                <td>{record.humidity}</td>
                                <td>{record.rainfall}</td>
                                <td>{record.date_recorded}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="no-data">
                                No environmental records found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EnvRecordsTable;
