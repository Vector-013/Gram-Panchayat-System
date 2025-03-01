import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecordCard from "../components/RecordCard";
import "../../styles/Dashboard.css";
import manImage from "../../images/man.png";
import womanImage from "../../images/woman.png";
import bgImage from "../../images/village2.jpg";
import CitizenPanchayatForm from "./land_query";

const WelfareModal: React.FC = () => {
    return (
        <div className="card-holder col">
            <div className="imgCont"><img src={bgImage} alt="bg" className="bg-image" /></div>
            <div className="cardHolders">
                <div className="row">
                    <div className="col">
                        <RecordCard title="Health Record" to_link="land-query" onRedirect={() => alert("Redirecting to Landlord Record")} />
                    </div>
                    <div className="col">
                        <RecordCard title="Vaccine Record" to_link="vaccine" onRedirect={() => alert("Redirecting to Medical Record")} />
                    </div>
                    <div className="col">
                        <RecordCard title="Education Record" to_link="edu" onRedirect={() => alert("Redirecting to Medical Record")} />
                    </div>

                </div>
                <div className="row">
                    <div className="col">
                        <RecordCard title="Single Girl Child" to_link="sgc" onRedirect={() => alert("Redirecting to Landlord Record")} />
                    </div>
                    <div className="col">
                        <RecordCard title="MNREGA" to_link="asset-query" onRedirect={() => alert("Redirecting to Medical Record")} />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <RecordCard title="Analytics" to_link="analytics" onRedirect={() => alert("Redirecting to Medical Record")} />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default WelfareModal;