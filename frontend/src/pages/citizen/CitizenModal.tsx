import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecordCard from "../components/RecordCard";
import "../../styles/Dashboard.css";
// import manImage from "../../images/man.png";
// import womanImage from "../../images/woman.png";
import bgImage from "../../images/village2.jpg";

const CitizenModal = () => {
    return (
        <div className="card-holder col">
            <div className="imgCont"><img src={bgImage} alt="bg" className="bg-image" /></div>
            <div className="cardHolders">
                <div className="row">
                    <div className="col">
                        <RecordCard title="Land Record" onRedirect={() => alert("Redirecting to Landlord Record")} to_link="land-record"/>
                    </div>
                    <div className="col">
                        <RecordCard title="Medical Record" onRedirect={() => alert("Redirecting to Medical Record")} to_link="medical"/>
                    </div>
                    <div className="col">
                        <RecordCard to_link="tax" title="Tax Record" onRedirect={() => alert("Redirecting to Medical Record")} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <RecordCard title="Household Record" onRedirect={() => alert("Redirecting to Landlord Record")} to_link="household" />
                    </div>
                    <div className="col">
                        <RecordCard to_link="vaccine" title="Vaccine Record" onRedirect={() => alert("Redirecting to Medical Record")} />
                    </div>
                    <div className="col">
                        <RecordCard to_link="env" title="Environment Record" onRedirect={() => alert("Redirecting to Medical Record")} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <RecordCard to_link="flora_fauna" title="Flora Fauna Record" onRedirect={() => alert("Redirecting to Landlord Record")} />
                    </div>
                    <div className="col">
                        <RecordCard to_link="assets" title="Assets Record" onRedirect={() => alert("Redirecting to Medical Record")} />
                    </div>
                    <div className="col">
                        <RecordCard to_link="geo" title="Geo Features Record" onRedirect={() => alert("Redirecting to Medical Record")} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CitizenModal;