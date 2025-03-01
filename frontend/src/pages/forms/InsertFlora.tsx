import React, { useState } from "react";
import "../../styles/InsertForm.css";

const InsertFloraFauna: React.FC = () => {
  const [type, setType] = useState("tree");
  const [name, setName] = useState("");
  const [habitat, setHabitat] = useState("land");
  const [count, setCount] = useState<number | "">("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const requestBody = {
      type,
      name,
      habitat,
      count: count === "" ? null : count,
      password,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/flora-fauna/insert",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to insert flora/fauna record");
      }

      setSuccess("Flora/Fauna record successfully added!");

      setType("tree");
      setName("");
      setHabitat("land");
      setCount("");
      setPassword("");
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="insert-form-container">
      {error && <div className="insert-form-error">{error}</div>}
      {success && <div className="insert-form-success">{success}</div>}

      <form onSubmit={handleSubmit} className="insert-form">
        <label className="insert-form-label">Type:</label>
        <select
          className="insert-form-input"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="flora">Flora</option>
          <option value="fauna">Fauna</option>
        </select>

        <label className="insert-form-label">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="insert-form-input"
          required
        />

        <label className="insert-form-label">Habitat:</label>
        <select
          className="insert-form-input"
          value={habitat}
          onChange={(e) => setHabitat(e.target.value)}
        >
          <option value="desert">Desert</option>
          <option value="land">Land</option>
          <option value="water">Water</option>
          <option value="forest">Forest</option>
          <option value="mountains">Mountains</option>
        </select>

        <label className="insert-form-label">Count:</label>
        <input
          type="number"
          value={count}
          onChange={(e) =>
            setCount(e.target.value === "" ? "" : parseInt(e.target.value))
          }
          className="insert-form-input"
          required
        />

        <label className="insert-form-label">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="insert-form-input"
          required
        />

        <button type="submit" className="insert-form-submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default InsertFloraFauna;
