import React from "react";

interface RecordCardProps {
  title: string;
  onRedirect: () => void;
}

const RecordCard: React.FC<RecordCardProps> = ({ title, onRedirect }) => {
  return (
    <div className="card p-3 mb-3 shadow">
      <h5 className="card-title">{title}</h5>
      <button className="btn btn-primary" onClick={onRedirect}>
        View Record
      </button>
    </div>
  );
};

export default RecordCard;
