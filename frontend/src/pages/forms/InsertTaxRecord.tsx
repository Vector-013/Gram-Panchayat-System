import React, { useState } from "react";
import "../../styles/InsertForm.css";

const InsertTaxRecord: React.FC = () => {
    const [type, setType] = useState<string>("");
    const [amount, setAmount] = useState<number | "">("");
    const [paymentStatus, setPaymentStatus] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [citizenId, setCitizenId] = useState<number | "">("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const getToken = () => {
        return localStorage.getItem("token");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const requestBody = {
            type,
            amount: amount === "" ? 0 : amount,
            payment_status: paymentStatus,
            date,
            citizen_id: citizenId === "" ? null : citizenId,
        };

        try {
            const response = await fetch("http://localhost:8000/tax-records/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to insert tax record");
            }

            setSuccess("Tax record successfully added!");
            setType("");
            setAmount("");
            setPaymentStatus("");
            setDate("");
            setCitizenId("");
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="insert-form-container">
            <h3 className="insert-form-title">Insert New Tax Record</h3>
            {error && <div className="insert-form-error">{error}</div>}
            {success && <div className="insert-form-success">{success}</div>}
            <form onSubmit={handleSubmit} className="insert-form">
                <label className="insert-form-label">Tax Type:</label>
                <select 
                    value={type} 
                    onChange={(e) => setType(e.target.value)} 
                    className="insert-form-input" 
                    required
                >
                    <option value="">Select Tax Type</option>
                    <option value="Water Tax">Water Tax</option>
                    <option value="Road Tax">Road Tax</option>
                    <option value="Utility Tax">Utility Tax</option>
                    <option value="Property Tax">Property Tax</option>
                </select>

                <label className="insert-form-label">Amount:</label>
                <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value === "" ? "" : parseFloat(e.target.value))} 
                    className="insert-form-input" 
                    required
                />

                <label className="insert-form-label">Payment Status:</label>
                <select 
                    value={paymentStatus} 
                    onChange={(e) => setPaymentStatus(e.target.value)} 
                    className="insert-form-input" 
                    required
                >
                    <option value="">Select Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                </select>

                <label className="insert-form-label">Date:</label>
                <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    className="insert-form-input" 
                    required
                />

                <label className="insert-form-label">Citizen ID:</label>
                <input 
                    type="number" 
                    value={citizenId} 
                    onChange={(e) => setCitizenId(e.target.value === "" ? "" : parseInt(e.target.value))} 
                    className="insert-form-input" 
                    required
                />

                <button type="submit" className="insert-form-submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default InsertTaxRecord;
