import React, { useContext, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";

export default function Results() {
  const { state } = useLocation();
  const userSymptoms = state?.symptoms || "";
  const results = state?.results || [];

  // *** IMPORTANT: read user from context ***
  const { user, history, setHistory } = useContext(UserContext);

  // Save to history
  useEffect(() => {
    // localStorage history (unchanged)
    try {
      const historyData = JSON.parse(localStorage.getItem("history")) || [];
      historyData.push({
        symptoms: userSymptoms,
        results,
        date: new Date().toLocaleString(),
      });
      localStorage.setItem("history", JSON.stringify(historyData));
    } catch (err) {
      console.error("Local history error:", err);
    }

    // Save to DB (silent, but with console logs for debugging)
    async function saveToDB() {
      try {
        console.log("DEBUG: Results page saveToDB start");
        console.log("DEBUG user object:", user);
        console.log("DEBUG userSymptoms:", userSymptoms);
        console.log("DEBUG results:", results);

        const userId = user?._id || user?.id;
        if (!userId) {
          console.log("DEBUG: No userId available — skipping DB save.");
          return;
        }
        if (!results || results.length === 0) {
          console.log("DEBUG: No results to save — skipping DB save.");
          return;
        }

        const response = await fetch("http://localhost:5000/api/history/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            symptoms: userSymptoms.split(",").map((s) => s.trim()).filter(Boolean),
            results
          }),
        });

        const data = await response.json();
        console.log("DEBUG: history save response:", data);
      } catch (err) {
        console.error("Error saving history:", err);
      }
    }

    saveToDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  return (
    <div className="results-bg">
      <h1 className="results-title fade-in-slow">AI Health Diagnosis</h1>
      <p className="results-subtitle fade-in-slow">
        Based on: <strong>"{userSymptoms}"</strong>
      </p>

      <div className="results-grid fade-in-slow">
        {results.length === 0 && (
          <p style={{ textAlign: "center", opacity: 0.6 }}>
            No diseases matched your symptoms.
          </p>
        )}

        {results.map((res, index) => (
          <div className="result-card slide-up" key={index}>
            <div className="result-header">
              <span className="result-icon">{res.icon || "⚕️"}</span>
              <h2>{res.disease}</h2>
            </div>

            <div className="circle-wrapper">
              <svg className="progress-ring" width="110" height="110">
                <circle
                  className="progress-ring-circle-bg"
                  stroke="#dbeafe"
                  strokeWidth="10"
                  fill="transparent"
                  r="45"
                  cx="55"
                  cy="55"
                />
                <circle
                  className="progress-ring-circle"
                  stroke="#0284c7"
                  strokeWidth="10"
                  fill="transparent"
                  r="45"
                  cx="55"
                  cy="55"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 45}`,
                    strokeDashoffset: `${
                      2 * Math.PI * 45 * (1 - (res.severity || 0) / 100)
                    }`,
                  }}
                />
              </svg>
              <p className="circle-value">{res.severity ?? 0}%</p>
            </div>

          
            <h3>Precautions</h3>
            <ul className="result-list">
              {(res.precautions || []).map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Link to="/symptom-check" className="btn-primary retry-btn fade-in-slow">
        Re-check Symptoms
      </Link>
    </div>
  );
}
