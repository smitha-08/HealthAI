import React, { useState, useEffect } from "react";

export default function Profile() {
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(data);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const handlePasswordChange = () => {
    alert("Password Updated (future backend)");
  };

  return (
    <div className="profile-bg">
      <div className="profile-container glass">

        <h1 className="profile-title">Profile Settings</h1>

        {/* USER SETTINGS */}
        <div className="profile-section">
          <h2>Account Settings</h2>

          <button className="btn-primary" onClick={handlePasswordChange}>
            Change Password
          </button>

          <button className="btn-primary" onClick={toggleDarkMode}>
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </button>
        </div>

        {/* HISTORY */}
        <div className="profile-section">
          <h2>Diagnosis History</h2>

          {history.length === 0 && <p>No history yet.</p>}

          {history.map((item, i) => (
            <div key={i} className="history-card glass">
              <p><b>Date:</b> {item.date}</p>
              <p><b>Symptoms:</b> {item.symptoms}</p>

              <ul>
                {item.results.map((r, j) => (
                  <li key={j}>
                    {r.disease} — {r.severity}%
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}