import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecordCard from "../components/RecordCard";
import "../../styles/Dashboard.css";
// import manImage from "../../images/man.png";
// import womanImage from "../../images/woman.png";
import bgImage from "../../images/village2.jpg";

const AdminModal = () => {
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
                    <div className="col">
                        <RecordCard title="View" onRedirect={() => alert("Redirecting to Medical Record")} to_link="view"/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <RecordCard title="Super User" to_link="query" onRedirect={() => alert("Redirecting to SuperUser")} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminModal;