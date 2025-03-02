import React, { useEffect, useState } from "react";
import "../../styles/UpdateTaxes.css";

interface TaxRecord {
    tax_id: number;
    name: string;
    age: number;
    income: string;
    type: string;
    amount: string;
    payment_status: string;
    date: string;
}

const UpdateTaxes: React.FC = () => {
    const [taxRecords, setTaxRecords] = useState<TaxRecord[]>([]);
    const [filteredRecords, setFilteredRecords] = useState<TaxRecord[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Filter states
    const [nameFilter, setNameFilter] = useState("");
    const [minAge, setMinAge] = useState("");
    const [maxAge, setMaxAge] = useState("");
    const [minIncome, setMinIncome] = useState("");
    const [maxIncome, setMaxIncome] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [minAmount, setMinAmount] = useState("");
    const [maxAmount, setMaxAmount] = useState("");
    const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

    const getToken = () => {
        return localStorage.getItem("token"); // Retrieve token securely
    };

    useEffect(() => {
        const fetchTaxes = async () => {
            setLoading(true);
            setError(null);
            setMessage(null);

            try {
                const response = await fetch("http://localhost:8000/update-taxes/get", {
                    headers: {
                        "Authorization": `Bearer ${getToken()}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch taxes");
                }

                const data = await response.json();
                setTaxRecords(data.updated_taxes);
                setFilteredRecords(data.updated_taxes);
            } catch (err: any) {
                setError(err.message);
            }

            setLoading(false);
        };

        fetchTaxes();
    }, []);

    useEffect(() => {
        const filtered = taxRecords.filter(record => {
            const age = parseInt(record.age.toString());
            const income = parseFloat(record.income);
            const amount = parseFloat(record.amount);
            const date = new Date(record.date).getTime();

            return (
                (nameFilter === "" || record.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
                (typeFilter === "" || record.type.toLowerCase().includes(typeFilter.toLowerCase())) &&
                (paymentStatusFilter === "" || record.payment_status.toLowerCase() === paymentStatusFilter.toLowerCase()) &&
                (minAge === "" || age >= parseInt(minAge)) &&
                (maxAge === "" || age <= parseInt(maxAge)) &&
                (minIncome === "" || income >= parseFloat(minIncome)) &&
                (maxIncome === "" || income <= parseFloat(maxIncome)) &&
                (minAmount === "" || amount >= parseFloat(minAmount)) &&
                (maxAmount === "" || amount <= parseFloat(maxAmount)) &&
                (minDate === "" || date >= new Date(minDate).getTime()) &&
                (maxDate === "" || date <= new Date(maxDate).getTime())
            );
        });

        setFilteredRecords(filtered);
    }, [nameFilter, minAge, maxAge, minIncome, maxIncome, typeFilter, minAmount, maxAmount, paymentStatusFilter, minDate, maxDate, taxRecords]);

    const handleUpdateTaxes = async () => {
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const response = await fetch("http://localhost:8000/update-taxes/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to update taxes");
            }

            const data = await response.json();
            setMessage(data.message);
            setTaxRecords(data.updated_taxes);
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="update-taxes-container">
            <button className="update-taxes-button" onClick={handleUpdateTaxes} disabled={loading}>
                {loading ? "Updating..." : "Update Taxes"}
            </button>

            {message && <div className="update-taxes-message">{message}</div>}
            {error && <div className="update-taxes-error">{error}</div>}

            {/* Filters */}
            <div className="tax-filter-container">
                <input type="text" placeholder="Filter by Name" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} className="tax-filter-input" />
                <input type="number" placeholder="Min Age" value={minAge} onChange={(e) => setMinAge(e.target.value)} className="tax-filter-input" />
                <input type="number" placeholder="Max Age" value={maxAge} onChange={(e) => setMaxAge(e.target.value)} className="tax-filter-input" />
                <input type="number" placeholder="Min Income" value={minIncome} onChange={(e) => setMinIncome(e.target.value)} className="tax-filter-input" />
                <input type="number" placeholder="Max Income" value={maxIncome} onChange={(e) => setMaxIncome(e.target.value)} className="tax-filter-input" />
                <input type="text" placeholder="Tax Type" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="tax-filter-input" />
                <input type="number" placeholder="Min Amount" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} className="tax-filter-input" />
                <input type="number" placeholder="Max Amount" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} className="tax-filter-input" />
                <select value={paymentStatusFilter} onChange={(e) => setPaymentStatusFilter(e.target.value)} className="tax-filter-input">
                    <option value="">Payment Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                </select>
                <input type="date" placeholder="Min Date" value={minDate} onChange={(e) => setMinDate(e.target.value)} className="tax-filter-input" />
                <input type="date" placeholder="Max Date" value={maxDate} onChange={(e) => setMaxDate(e.target.value)} className="tax-filter-input" />
            </div>

            {filteredRecords.length > 0 && (
                <div className="tax-table-container">
                    <table className="tax-table">
                        <thead>
                            <tr>
                                <th>Tax ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Income</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Payment Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.map((record) => (
                                <tr key={record.tax_id}>
                                    <td>{record.tax_id}</td>
                                    <td>{record.name}</td>
                                    <td>{record.age}</td>
                                    <td>{record.income}</td>
                                    <td>{record.type}</td>
                                    <td>{record.amount}</td>
                                    <td>{record.payment_status}</td>
                                    <td>{record.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UpdateTaxes;
