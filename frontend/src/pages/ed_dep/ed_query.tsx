import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EducationForm() {
    const [education, setEducation] = useState("");
    const [gender, setGender] = useState("");
    const [dobMin, setDobMin] = useState("");
    const [dobMax, setDobMax] = useState("");
    const [incomeMin, setIncomeMin] = useState(0);
    const [incomeMax, setIncomeMax] = useState(100000);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (incomeMin > incomeMax) {
            setError("Minimum income value cannot be greater than maximum income value.");
            return;
        }
        try {
            const requestBody = {
                education,
                gender,
                dob_min: dobMin,
                dob_max: dobMax,
                income_min: incomeMin,
                income_max: incomeMax,
            };
            
            const response = await fetch("http://localhost:8000/edu-dpt/edu-query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });
            if (!response.ok) {
                throw new Error("Submission failed");
            }
            navigate("/success");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Education Query</h2>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="education">Educational Qualification:</label>
                <select id="education" name="education" required value={education} onChange={(e) => setEducation(e.target.value)}>
                    <option value="">Select Qualification</option>
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                    <option value="Higher Secondary">Higher Secondary</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                </select>
                <br /><br />
                
                <label htmlFor="gender">Gender:</label>
                <select id="gender" name="gender" required value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <br /><br />
                
                <label>Date of Birth Range:</label>
                <br />
                <label htmlFor="dob_min">From:</label>
                <input 
                    type="date" 
                    id="dob_min" 
                    name="dob_min" 
                    value={dobMin} 
                    onChange={(e) => setDobMin(e.target.value)}
                />
                
                <label htmlFor="dob_max">To:</label>
                <input 
                    type="date" 
                    id="dob_max" 
                    name="dob_max" 
                    value={dobMax} 
                    onChange={(e) => setDobMax(e.target.value)}
                />
                <br /><br />
                
                <label>Household Income Range:</label>
                <br />
                <label htmlFor="income_min">Min:</label>
                <input 
                    type="number" 
                    id="income_min" 
                    name="income_min" 
                    min="0" 
                    step="100" 
                    value={incomeMin} 
                    onChange={(e) => setIncomeMin(parseFloat(e.target.value))} 
                />
                
                <label htmlFor="income_max">Max:</label>
                <input 
                    type="number" 
                    id="income_max" 
                    name="income_max" 
                    min="0" 
                    step="100" 
                    value={incomeMax} 
                    onChange={(e) => setIncomeMax(parseFloat(e.target.value))} 
                />
                <br /><br />
                
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default EducationForm;