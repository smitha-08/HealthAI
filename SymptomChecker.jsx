import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert string → array
    const symptomsArray = symptoms
      .split(",")
      .map((s) => s.trim().toLowerCase());

    // Send to backend AI
    const response = await fetch("http://localhost:5000/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms: symptomsArray })
    });

    const data = await response.json();

    // Navigate to results page with AI data
    navigate("/results", {
      state: {
        symptoms,
        results: data.results || []
      }
    });
  };

  return (
    <div className="hero symptom-page">
      <div className="overlay"></div>

      <div className="symptom-box fade-in">
        <h2>Describe Your Symptoms</h2>

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="e.g., fever, headache, sore throat..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          ></textarea>

          <button className="btn-primary" type="submit">
            Analyze Symptoms
          </button>
        </form>
      </div>
    </div>
  );
}

