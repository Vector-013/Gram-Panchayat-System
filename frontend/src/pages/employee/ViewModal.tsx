import React, { useState } from "react";
import "../../styles/ViewModal.css";
import bgImage from "../../images/village.jpg";

interface Citizen {
    id: number;
    name: string;
    age: number;
    gender: string;
    address: string;
}

const ViewModal: React.FC = () => {
    const [citizens, setCitizens] = useState<Citizen[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const role = localStorage.getItem("role");

    const handleViewCitizens = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:8000/citizens/", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch citizens.");
            }

            const data: Citizen[] = await response.json();
            setCitizens(data);
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="insert-modal-container card-holder">
            <h2 className="insert-modal-title">View Records</h2>

            {role === "pradhan" || role === "admin" ? (
                <button onClick={handleViewCitizens} className="insert-form-submit" disabled={loading}>
                   View All Citizens
                </button>
            ) : (
                <p className="insert-placeholder">You do not have permission to view this data.</p>
            )}

            {error && <div className="insert-form-error">{error}</div>}

            <table className="citizen-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={5} className="loading-placeholder">Loading...</td>
                        </tr>
                    ) : citizens.length > 0 ? (
                        citizens.map((citizen) => (
                            <tr key={citizen.id}>
                                <td>{citizen.id}</td>
                                <td>{citizen.name}</td>
                                <td>{citizen.age}</td>
                                <td>{citizen.gender}</td>
                                <td>{citizen.address}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="no-records-placeholder">No records found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewModal;
