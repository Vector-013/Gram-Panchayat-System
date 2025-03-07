import React, { useState } from "react";
import "../../styles/UpdateModal.css";
import UpdateCitizen from "../forms/UpdateCitizen";
import UpdateHousehold from "../forms/UpdateHousehold";
import UpdateLandRecord from "../forms/UpdateLandRecord";
import UpdateWelfareScheme from "../forms/UpdateWelfareScheme";
import UpdateTaxes from "../forms/UpdateTaxes";
import UpdateEmp from "../forms/UpdateEmp";
import bgImage from "../../images/village.jpg";

const UpdateModal: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string>("");
    const role = localStorage.getItem("role");

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value);
    };

    return (
        <div className="update-modal-container col card-holder">
            <div className="imgHolder">
                <img src={bgImage} alt="bg" className="bg-image" />
            </div>

            {/* Dropdown for selecting update type */}
            <div className="update-type-container">
                <label className="update-label">Select Type:</label>
                <select className="update-dropdown" value={selectedType} onChange={handleTypeChange}>
                    <option value="">Choose an option</option>
                    <option value="citizen">Citizen</option>
                    <option value="household">Household</option>
                    <option value="land">Land Record</option>
                    <option value="welfare">Welfare Scheme</option>
                    <option value="tax">Tax Record</option>
                    {role === 'pradhan' && <option value="employee">Employee</option>}
                </select>
            </div>

            {/* Placeholder for the selected form */}
            {selectedType === "" && <p className="update-placeholder">Please select an update type to continue.</p>}

            {selectedType === "citizen" && <UpdateCitizen />}
            {selectedType === "household" && <UpdateHousehold />}
            {selectedType === "land" && <UpdateLandRecord />}
            {selectedType === "welfare" && <UpdateWelfareScheme />}
            {selectedType === "tax" && <UpdateTaxes />}
            {selectedType === "employee" && <UpdateEmp />}
        </div>
    );
};

export default UpdateModal;
