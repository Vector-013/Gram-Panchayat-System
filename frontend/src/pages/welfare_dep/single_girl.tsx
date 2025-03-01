import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SchemeQueryForm() {
    const [householdIncomeMin, setHouseholdIncomeMin] = useState(0);
    const [householdIncomeMax, setHouseholdIncomeMax] = useState(100000);
    const [ageMin, setAgeMin] = useState(18);
    const [ageMax, setAgeMax] = useState(100);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (householdIncomeMin > householdIncomeMax) {
            setError("Minimum household income cannot be greater than maximum household income.");
            return;
        }
        if (ageMin > ageMax) {
            setError("Minimum age cannot be greater than maximum age.");
            return;
        }
        try {
            const requestBody = {
                household_income_min: householdIncomeMin,
                household_income_max: householdIncomeMax,
                age_min: ageMin,
                age_max: ageMax,
            };
            
            const response = await fetch("http://localhost:8000/scheme-query", {
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
            <h2>Scheme Query</h2>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>Household Income Range:</label>
                <br />
                <label htmlFor="household_income_min">Min:</label>
                <input 
                    type="number" 
                    id="household_income_min" 
                    name="household_income_min" 
                    min="0" 
                    step="100" 
                    value={householdIncomeMin} 
                    onChange={(e) => setHouseholdIncomeMin(parseFloat(e.target.value))} 
                />
                
                <label htmlFor="household_income_max">Max:</label>
                <input 
                    type="number" 
                    id="household_income_max" 
                    name="household_income_max" 
                    min="0" 
                    step="100" 
                    value={householdIncomeMax} 
                    onChange={(e) => setHouseholdIncomeMax(parseFloat(e.target.value))} 
                />
                <br /><br />
                
                <label>Age Range:</label>
                <br />
                <label htmlFor="age_min">Min Age:</label>
                <input 
                    type="number" 
                    id="age_min" 
                    name="age_min" 
                    min="0" 
                    max="150" 
                    value={ageMin} 
                    onChange={(e) => setAgeMin(parseInt(e.target.value))} 
                />
                
                <label htmlFor="age_max">Max Age:</label>
                <input 
                    type="number" 
                    id="age_max" 
                    name="age_max" 
                    min="0" 
                    max="150" 
                    value={ageMax} 
                    onChange={(e) => setAgeMax(parseInt(e.target.value))} 
                />
                <br /><br />
                
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default SchemeQueryForm;