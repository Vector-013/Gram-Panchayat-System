import React from "react";
import "../../styles/Record.css";
import bgImage from "../../images/village.jpg";
import { useNavigate } from "react-router-dom";

interface RecordCardProps {
  title: string;
  onRedirect: () => void;
  to_link: string;
}

const RecordCard: React.FC<RecordCardProps> = ({ title, onRedirect, to_link}) => {
  const navigate = useNavigate();
  return (
    <div className="card card-rec mb-3">
      <h5 className="card-title c-title">{title}</h5>
      <button className="btn" onClick={() => navigate(to_link)}>
        View Record
      </button>
    </div>
  );
};

export default RecordCard;
