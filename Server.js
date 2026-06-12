import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// --- CONFIGS & ROUTES ---
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import hybridModel from "./ai/hybridModel.js";
import Disease from "./models/Disease.js";
import historyRoutes from "./routes/historyRoutes.js";


dotenv.config();

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- CONNECT DB (ONLY ONCE) ---
connectDB();

// --- TEST ROUTE ---
app.get("/", (req, res) => {
  res.send("HealthAI Backend Running...");
});

// --- AUTH ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);
/* ===========================================
         🔥 AI ANALYSIS ROUTE
=========================================== */
app.post("/api/analyze", async (req, res) => {
  try {
    let { symptoms } = req.body;

    // "fever, cough, pain" → ["fever","cough","pain"]
    const userSymptoms = String(symptoms)
      .split(",")
      .map((s) => s.toLowerCase().trim())
      .filter(Boolean);

    const results = await hybridModel(userSymptoms);
    return res.json({ results });

  } catch (err) {
    console.error("Analyze Error:", err);
    return res.json({ results: [] });
  }
});

/* ===========================================
         🚀 START SERVER
=========================================== */
const PORT = process.env.PORT || 5000;
app.get("/api/test-db", async (req, res) => {
  try {
    const docs = await Disease.find().limit(5);
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/debug-first", async (req, res) => {
  const doc = await Disease.findOne();
  res.json(doc);
});


app.listen(PORT, () => console.log(`✔ Server running on port ${PORT}`));

