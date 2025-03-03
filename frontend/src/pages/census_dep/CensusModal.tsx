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
                        <RecordCard title="Birth Record" to_link="birth-query" onRedirect={() => alert("Redirecting to Birth Record")} />
                    </div>
                    <div className="col">
                        <RecordCard title="Death Record" to_link="death-query" onRedirect={() => alert("Redirecting to Death Record")} />
                    </div>
                    <div className="col">
                        <RecordCard title="Marriage Record" to_link="marriage-query" onRedirect={() => alert("Redirecting to Marriage Record")} />
                    </div>

                </div>
                <div className="row">
                    <div className="col">
                        <RecordCard title="Environment Record" to_link="env-query" onRedirect={() => alert("Redirecting to Environment Record")} />
                    </div>
                    <div className="col">
                        <RecordCard title="Flora Fauna Record" to_link="flora-query" onRedirect={() => alert("Redirecting to Flora Fauna Record")} />
                    </div>
                    <div className="col">
                        <RecordCard title="Geo Record" to_link="geo-query" onRedirect={() => alert("Redirecting to Geo Physical Record")} />
                    </div>
                 
                </div>
                 <div className="row">
                    <div className="col">
                        <RecordCard title="Environment Analytics" to_link="env-analytics" onRedirect={() => alert("Redirecting to env Physical Record")} />
                    </div>
                     <div className="col">
                        <RecordCard title="People Analytics" to_link="ppl-analytics" onRedirect={() => alert("Redirecting to env Physical Record")} />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ITModal;