import React, { useState } from "react";
import "../../styles/InsertModal.css";
import DeleteCitizen from "../forms/DeleteCitizen";
import DeleteBirth from "../forms/DeleteBirth";
import DeleteDeath from "../forms/DeleteDeath";
import DeleteFloraFauna from "../forms/DeleteFlora";
import DeleteGeo from "../forms/DeleteGeo";
import DeleteEnv from "../forms/DeleteEnv";
import DeleteHousehold from "../forms/DeleteHousehold";
import DeleteAsset from "../forms/DeleteAsset";
import DeleteLandRecord from "../forms/DeleteLandRecords";
import DeleteWelfareScheme from "../forms/DeleteWelfareScheme";
import DeleteMarriage from "../forms/DeleteMarriage";
import DeleteEmployee from "../forms/DeleteEmployee";
import DeleteScheme from "../forms/DeleteSchemeEnrol";
import DeleteHealth from "../forms/DeleteHealth";
import bgImage from "../../images/village.jpg";

const DeleteModal: React.FC = () => {
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
            <h2 className="insert-modal-title">Delete Record</h2>

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
                    <option value="flora-fauna">Flora-Fauna Record</option>
                    <option value="geo">Geographical Record</option>
                    <option value="birth">Birth Record</option>
                    <option value="death">Death Record</option>
                    <option value="scheme">Scheme Enrollment</option>
                    {(role == 'pradhan' || role == 'admin') && <option value="employee">Employee</option>}
                </select>
            </div>

            {selectedType === "" && <p className="insert-placeholder">Please select a delete type to continue.</p>}

            {selectedType === "citizen" && <DeleteCitizen />}
            {selectedType === "household" && <DeleteHousehold />}
            {selectedType === "asset" && <DeleteAsset />}
            {selectedType === "land" && <DeleteLandRecord />}
            {selectedType === "welfare" && <DeleteWelfareScheme />}
            {selectedType === "tax" && <p className="insert-placeholder">Tax Record deletion form will appear here.</p>}
            {selectedType === "education" && <p className="insert-placeholder">Education Record deletion form will appear here.</p>}
            {selectedType === "health" && <DeleteHealth />}
            {selectedType === "birth" && <DeleteBirth />}
            {selectedType === "death" && <DeleteDeath />}
            {selectedType === "flora-fauna" && <DeleteFloraFauna />}
            {selectedType === "geo" && <DeleteGeo />}
            {selectedType === "environment" && <DeleteEnv />}
            {selectedType === "marriage" && <DeleteMarriage />}
            {selectedType === "employee" && <DeleteEmployee />}
            {selectedType === "scheme" && <DeleteScheme />}
        </div>
    );
};

export default DeleteModal;
