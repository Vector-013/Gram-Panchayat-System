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
                        <RecordCard title="Insert Citizen" onRedirect={() => alert("Redirecting to Landlord Record")} to_link="land-record"/>
                    </div>
                    <div className="col">
                        <RecordCard title="Update Citizen" onRedirect={() => alert("Redirecting to Medical Record")} to_link="medical"/>
                    </div>
                    <div className="col">
                        <RecordCard title="View Citizen" onRedirect={() => alert("Redirecting to Medical Record")} to_link="medical"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <RecordCard title="Insert Asset" onRedirect={() => alert("Redirecting to Landlord Record")} to_link="household" />
                    </div>
                    <div className="col">
                        <RecordCard to_link="vaccine" title="Update Asset" onRedirect={() => alert("Redirecting to Medical Record")} />
                    </div>
                    <div className="col">
                        <RecordCard to_link="env" title="View Asset" onRedirect={() => alert("Redirecting to Medical Record")} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeModal;