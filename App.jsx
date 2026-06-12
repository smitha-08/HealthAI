import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      {/* ✅ NAVBAR */}
      <header className="navbar">
        <div className="logo">HealthAI Advisor</div>
        <nav>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#impact">Impact</a>
          <a href="#contact">Contact</a>
          <Link to="/profile">Profile</Link>

        </nav>
        <Link to="/signup" className="btn-primary">Get Started</Link>

      </header>

      {/* ✅ HERO SECTION */}
      <section id="home" className="hero">
        <div className="overlay">
          <div className="hero-text">
            <h1>Your Personal AI Health Advisor</h1>
            <p>
              Get AI-powered health guidance instantly. Enter your symptoms and
              receive personalized insights in seconds.
            </p>
            <button className="btn-primary">Start Checking</button>
          </div>
        </div>
      </section>

      {/* ✅ FEATURES */}
      <section id="features" className="features">
        <h2>Powerful Features</h2>
        <div className="feature-grid">
          <div className="card">
            <h3>AI-Powered Analysis</h3>
            <p>
              Advanced models analyze your symptoms and provide data-driven
              suggestions.
            </p>
          </div>
          <div className="card">
            <h3>24/7 Availability</h3>
            <p>Access health guidance anytime, anywhere—no waiting required.</p>
          </div>
          <div className="card">
            <h3>Severity Detection</h3>
            <p>Detect when symptoms might need urgent medical attention.</p>
          </div>
          <div className="card">
            <h3>Health Recommendations</h3>
            <p>
              Get personalized wellness and self-care tips tailored to your
              inputs.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ HOW IT WORKS */}
      <section id="how" className="how">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span>1</span>
            <p>Enter your symptoms.</p>
          </div>
          <div className="step">
            <span>2</span>
            <p>Our AI analyzes your condition.</p>
          </div>
          <div className="step">
            <span>3</span>
            <p>Receive personalized health insights instantly.</p>
          </div>
        </div>
        <p className="disclaimer">
          ⚠️ This tool provides educational guidance and is not a substitute for
          professional medical advice.
        </p>
      </section>

      {/* ✅ IMPACT */}
      <section id="impact" className="impact">
        <h2>Our Impact & Vision</h2>
        <div className="impact-grid">
          <div className="impact-card">
            <h3>Environmental</h3>
            <p>
              Reduces unnecessary clinic visits, saving resources and emissions.
            </p>
          </div>
          <div className="impact-card">
            <h3>Social</h3>
            <p>
              Improves accessibility for those in remote or underserved areas.
            </p>
          </div>
          <div className="impact-card">
            <h3>Convenience</h3>
            <p>Instant access to preliminary health guidance, 24/7.</p>
          </div>
          <div className="impact-card">
            <h3>Global Health</h3>
            <p>
              Promotes digital health awareness and supports telemedicine.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ CTA */}
      <section id="cta" className="cta">
        <h2>Ready to Check Your Symptoms?</h2>
        <p>
          Get quick, AI-powered insights. Empower your health decisions with
          intelligent analysis.
        </p>
        <button className="btn-light">Start Now</button>
      </section>

      {/* ✅ FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} HealthAI Advisor — All Rights Reserved</p>
          <p className="small">
            Disclaimer: This demo is for educational use only. Always consult a
            medical professional.
          </p>
        </div>
      </footer>
    </div>
  );
}
