import React, { useState } from "react";
import "../../styles/InsertModal.css";
import InsertCitizen from "../forms/InsertCitizen";
import bgImage from "../../images/village.jpg";

const InsertModal: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string>("");

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value);
    };

    return (
        <div className="insert-modal-container card-holder">
            <div className="imgHolder">
                <img src={bgImage} alt="bg" className="bg-image" />
            </div>
            <h2 className="insert-modal-title">Insert New Record</h2>

            {/* Dropdown for selecting insert type */}
            <div className="insert-type-container">
                <label className="insert-label">Select Type:</label>
                <select className="insert-dropdown" value={selectedType} onChange={handleTypeChange}>
                    <option value="">Choose an option</option>
                    <option value="citizen">Citizen</option>
                    <option value="land">Land Record</option>
                    <option value="tax">Tax Record</option>
                    <option value="education">Education Record</option>
                    <option value="health">Health Record</option>
                </select>
            </div>

            {/* Placeholder for the selected form */}
            {selectedType === "" && <p className="insert-placeholder">Please select an insert type to continue.</p>}

            {selectedType === "citizen" && <InsertCitizen />}
            {selectedType === "land" && <p className="insert-placeholder">Land Record form will appear here.</p>}
            {selectedType === "tax" && <p className="insert-placeholder">Tax Record form will appear here.</p>}
            {selectedType === "education" && <p className="insert-placeholder">Education Record form will appear here.</p>}
            {selectedType === "health" && <p className="insert-placeholder">Health Record form will appear here.</p>}
        </div>
    );
};

export default InsertModal;
