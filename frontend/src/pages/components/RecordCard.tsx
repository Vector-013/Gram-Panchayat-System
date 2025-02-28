import React from "react";
import "../../styles/Record.css";
import bgImage from "../../images/village.jpg";

interface RecordCardProps {
  title: string;
  onRedirect: () => void;
}

const RecordCard: React.FC<RecordCardProps> = ({ title, onRedirect }) => {
  return (
    <div className="card card-rec mb-3">
      <h5 className="card-title c-title">{title}</h5>
      <button className="btn" onClick={onRedirect}>
        View Record
      </button>
    </div>
  );
};

export default RecordCard;
