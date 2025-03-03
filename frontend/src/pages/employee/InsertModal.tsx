import React, { useState } from "react";
import "../../styles/InsertModal.css";
import InsertCitizen from "../forms/InsertCitizen";
import InsertBirth from "../forms/InsertBirth";
import InsertDeath from "../forms/InsertDeath";
import InsertFloraFauna from "../forms/InsertFlora";
import InsertGeo from "../forms/InsertGeo";
import InsertEnv from "../forms/InsertEnv";
import InsertHousehold from "../forms/InsertHousehold";
import InsertAsset from "../forms/InsertAsset";
import InsertLandRecord from "../forms/InsertLandRecords";
import InsertWelfareScheme from "../forms/InsertWelfareScheme";
import InsertMarriage from "../forms/InsertMarriage";
import InsertEmployee from "../forms/InsertEmployee";
import InsertScheme from "../forms/InsertSchemeEnrol";
import InsertHealth from "../forms/InsertHealth";
import InsertTaxRecord from "../forms/InsertTaxRecord";
import bgImage from "../../images/village.jpg";

const InsertModal: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string>("");
    const role = localStorage.getItem("role");

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
                    <option value="household">Household</option>
                    <option value="asset">Asset</option>
                    <option value="land">Land Record</option>
                    <option value="welfare">Welfare Scheme</option>
                    <option value="tax">Tax Record</option>
                    <option value="health">Health Record</option>
                    <option value="marriage">Marriage Record</option>
                    <option value="geo">Geographical Record</option>
                    <option value="birth">Birth Record</option>
                    <option value="death">Death Record</option>
                    <option value="scheme">Scheme Enrollment</option>
                    {(role == 'pradhan' || role == 'admin') && <option value="employee">Employee</option>}
                </select>
            </div>

            {/* Placeholder for the selected form */}
            {selectedType === "" && <p className="insert-placeholder">Please select an insert type to continue.</p>}

            {selectedType === "citizen" && <InsertCitizen />}
            {selectedType === "household" && <InsertHousehold />}
            {selectedType === "asset" && <InsertAsset />}
            {selectedType === "land" && <InsertLandRecord />}
            {selectedType === "welfare" && <InsertWelfareScheme
            />}
            {selectedType === "tax" && <InsertTaxRecord />}
            {selectedType === "education" && <p className="insert-placeholder">Education Record form will appear here.</p>}
            {selectedType === "health" && <InsertHealth />}
            {selectedType === "birth" && <InsertBirth />}
            {selectedType === "death" && < InsertDeath/>}
            {selectedType === "geo" && <InsertGeo/>}
            {selectedType === "environment" && <InsertEnv/>}
            {selectedType === "marriage" && <InsertMarriage />}
            {selectedType === "employee" && <InsertEmployee />}
            {selectedType === "scheme" && <InsertScheme />}
        </div>
    );
};

export default InsertModal;
