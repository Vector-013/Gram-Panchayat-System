import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecordCard from "../components/RecordCard";
import "../../styles/Dashboard.css";
// import manImage from "../../images/man.png";
// import womanImage from "../../images/woman.png";
import bgImage from "../../images/village2.jpg";

const EmployeeModal = () => {
    return (
        <div className="card-holder col">
            <div className="imgCont"><img src={bgImage} alt="bg" className="bg-image" /></div>
            <div className="cardHolders">
                <div className="row">
                    <div className="col">
                        <RecordCard title="Insert" onRedirect={() => alert("Redirecting to Landlord Record")} to_link="insert"/>
                    </div>
                    <div className="col">
                        <RecordCard title="Update" onRedirect={() => alert("Redirecting to Medical Record")} to_link="update"/>
                    </div>
                    <div className="col">
                        <RecordCard title="Delete" onRedirect={() => alert("Redirecting to Medical Record")} to_link="delete"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeModal;