import { useState } from "react";
import { useNavigate } from "react-router-dom";

function IncomeQueryForm() {
    const [incomeMin, setIncomeMin] = useState(0);
    const [incomeMax, setIncomeMax] = useState(100000);
    const [householdIncomeMin, setHouseholdIncomeMin] = useState(0);
    const [householdIncomeMax, setHouseholdIncomeMax] = useState(200000);
    const [gender, setGender] = useState("");
    const [ageMin, setAgeMin] = useState(18);
    const [ageMax, setAgeMax] = useState(100);
    const [education, setEducation] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (incomeMin > incomeMax || householdIncomeMin > householdIncomeMax || ageMin > ageMax) {
            setError("Invalid range values.");
            return;
        }
        try {
            const requestBody = {
                income_min: incomeMin,
                income_max: incomeMax,
                household_income_min: householdIncomeMin,
                household_income_max: householdIncomeMax,
                gender,
                age_min: ageMin,
                age_max: ageMax,
                educational_qualification: education,
            };
            
            const response = await fetch("http://localhost:8000/income-query", {
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
        <div className="col card-holder">
            <h2>Income Query</h2>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>Individual Income Range:</label>
                <br />
                <input type="number" value={incomeMin} onChange={(e) => setIncomeMin(parseFloat(e.target.value))} />
                <input type="number" value={incomeMax} onChange={(e) => setIncomeMax(parseFloat(e.target.value))} />
                <br /><br />
                
                <label>Household Income Range:</label>
                <br />
                <input type="number" value={householdIncomeMin} onChange={(e) => setHouseholdIncomeMin(parseFloat(e.target.value))} />
                <input type="number" value={householdIncomeMax} onChange={(e) => setHouseholdIncomeMax(parseFloat(e.target.value))} />
                <br /><br />
                
                <label>Gender:</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <br /><br />
                
                <label>Age Range:</label>
                <br />
                <input type="number" value={ageMin} onChange={(e) => setAgeMin(parseInt(e.target.value))} />
                <input type="number" value={ageMax} onChange={(e) => setAgeMax(parseInt(e.target.value))} />
                <br /><br />
                
                <label>Educational Qualification:</label>
                <select value={education} onChange={(e) => setEducation(e.target.value)}>
                    <option value="">Select Qualification</option>
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                    <option value="Higher Secondary">Higher Secondary</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                </select>
                <br /><br />
                
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default IncomeQueryForm;