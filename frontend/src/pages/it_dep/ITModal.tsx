import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecordCard from "../components/RecordCard";
import "../../styles/Dashboard.css";
import manImage from "../../images/man.png";
import womanImage from "../../images/woman.png";
import bgImage from "../../images/village2.jpg";
import CitizenPanchayatForm from "./land_query";

const ITModal: React.FC = () => {
    return (
        <div className="card-holder col">
            <div className="imgCont"><img src={bgImage} alt="bg" className="bg-image" /></div>
            <div className="cardHolders">
                <div className="row">
                    <div className="col">
                        <RecordCard title="Land Record" to_link="land-query" onRedirect={() => alert("Redirecting to Landlord Record") } />
                    </div>
                    <div className="col">
                        <RecordCard title="Tax Record" to_link="/land-query" onRedirect={() => alert("Redirecting to Medical Record")} />
                    </div>

                </div>
                <div className="row">
                    <div className="col">
                        <RecordCard title="Income Record" to_link="/land-query" onRedirect={() => alert("Redirecting to Landlord Record")} />
                    </div>
                    <div className="col">
                        <RecordCard title="Asset Record" to_link="/land-query" onRedirect={() => alert("Redirecting to Medical Record")} />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ITModal;