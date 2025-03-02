import React from "react";
import "../../styles/Record.css";
import bgImage from "../../images/village.jpg";
import { useNavigate } from "react-router-dom";
import landRecordImage from "../../../../icons/land.png";
import medicalRecordImage from "../../../../icons/health.png";
import taxRecordImage from "../../../../icons/tax.png";
import vaccineRecordImage from "../../../../icons/vaccination.png";
import householdRecordImage from "../../../../icons/family.png";
import envRecordImage from "../../../../icons/env.png";
import floraFaunaRecordImage from "../../../../icons/flora_fauna.png";
import geoRecordImage from "../../../../icons/geo.png";
import assetRecordImage from "../../../../icons/assets.png";
import sgcRecordImage from "../../../../icons/single_girl.png";
import mgnregaRecordImage from "../../../../icons/mgnrega.png";
import insertRecordImage from "../../../../icons/insert.png";
import updateRecordImage from "../../../../icons/update.png";
import deleteRecordImage from "../../../../icons/delete.png";
import analyticsRecordImage from "../../../../icons/analytics.png";
import incomeRecordImage from "../../../../icons/income.png";
import educationRecordImage from "../../../../icons/education.png";

interface RecordCardProps {
  title: string;
  onRedirect: () => void;
  to_link: string;
}

const RecordCard: React.FC<RecordCardProps> = ({ title, onRedirect, to_link }) => {
  const navigate = useNavigate();
  let src = "";
  if (title === "Land Record") {
    src = landRecordImage;
  } else if (title === "Health Record") {
    src = medicalRecordImage;
  } else if (title === "Tax Record") {
    src = taxRecordImage;
  } else if (title === "Vaccine Record") {
    src = vaccineRecordImage;
  } else if (title === "Household Record") {
    src = householdRecordImage;
  } else if (title === "Environment Record") {
    src = envRecordImage;
  } else if (title === "Flora Fauna Record") {
    src = floraFaunaRecordImage;
  } else if (title === "Geo Features Record" || title === "Geo Record") {
    src = geoRecordImage;
  } else if (title === "Assets Record" || title === "Asset Record") {
    src = assetRecordImage;
  } else if (title === "Single Girl Child") {
    src = sgcRecordImage;
  } else if (title === "MGNREGA") {
    src = mgnregaRecordImage;
  } else if (title === "Insert") {
    src = insertRecordImage;
  } else if (title === "Update") {
    src = updateRecordImage;
  } else if (title === "Delete") {
    src = deleteRecordImage;
  } else if (title === "Analytics") {
    src = analyticsRecordImage;
  } else if (title === "Income Record") {
    src = incomeRecordImage;
  } else if (title === "Education Record") {
    src = educationRecordImage;
  }

  return (
    <div className="card card-rec mb-3">
      <h5 className="card-title c-title">{title}</h5>
      <div className="card-icon">
        <img src={src} alt="land record" />
      </div>
      <button className="btn" onClick={() => navigate(to_link)}>
        View Record
      </button>
    </div>
  );
};

export default RecordCard;
